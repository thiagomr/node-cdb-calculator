const Calculator = require('../src/lib/calculator');
const { expect } = require('@jest/globals');

const prices = {
    '2021-01-01': 19.23,
    '2021-01-02': 21.30,
    '2021-01-03': 20.64,
};

test('should return a missing parameter error [investmentDate]', () => {
    const calculator = new Calculator(100, null, '2020-01-01', prices);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('missing parameter [investmentDate]');
});

test('should return a missing parameter error [cdbRate]', () => {
    const calculator = new Calculator(null, '2020-01-01', '2020-01-01', prices);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('missing parameter [cdbRate]');
});

test('should return a missing parameter error [currentDate]', () => {
    const calculator = new Calculator(100, '2020-01-01', null, prices);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('missing parameter [currentDate]');
});

test('should return a invalid date format error [investmentDate]', () => {
    const calculator = new Calculator(100, '20-01-0111', '2020-01-01', prices);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('invalid date format [investmentDate]');
});

test('should return a invalid date format error [currentDate]', () => {
    const calculator = new Calculator(100, '2020-01-01', '201-1-1', prices);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('invalid date format [currentDate]');
});

test('should return a invalid value type [cdbRate]', () => {
    const calculator = new Calculator('100', '2020-01-01', '2020-01-01', prices);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('invalid cdbRate value');
});

test('should return a invalid date error [currentDate < investmentDate]', () => {
    const calculator = new Calculator(100, '2020-01-01', '2019-01-01', prices);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('invalid date error [currentDate must be greater than invesmentDate]');
});

test('should return valid parameters', () => {
    const calculator = new Calculator(100, '2020-01-01', '2020-01-01', prices);
    const result = calculator.validateParams();

    expect(result.valid).toBe(true);
});

// test('should return a valid TCDI tax value', () => {

// });

// test('should return a CDI tax value', () => {

// });

// test('should return a list of CDBs between investmentDate and currentDate', () => {

// });
