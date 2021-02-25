const Calculator = require('../src/lib/calculator');
const { getJSONPricesFromCsv } = require('../src/lib/market-data');

// const prices = {
//     '2016-11-14': 13.88,
//     '2016-11-16': 13.88,
//     '2016-11-17': 13.88,
//     '2016-11-18': 13.88,
//     '2016-11-21': 13.88,
//     '2016-11-22': 13.88,
//     '2016-11-23': 13.88,
//     '2016-11-24': 13.88,
//     '2016-11-25': 13.88,
//     '2016-11-28': 13.88,
//     '2016-11-29': 13.88,
//     '2016-11-30': 13.88,
//     '2016-12-01': 13.63,
//     '2016-12-02': 13.63,
//     '2016-12-05': 13.63,
//     '2016-12-06': 13.63,
//     '2016-12-07': 13.63,
//     '2016-12-08': 13.63,
//     '2016-12-09': 13.63,
//     '2016-12-12': 13.63,
//     '2016-12-13': 13.63,
//     '2016-12-14': 13.63,
//     '2016-12-15': 13.63,
//     '2016-12-16': 13.63,
//     '2016-12-19': 13.63,
//     '2016-12-20': 13.63,
//     '2016-12-21': 13.63,
//     '2016-12-22': 13.63,
//     '2016-12-23': 13.63
// };

test('should return a missing parameter error [investmentDate]', () => {
    const calculator = new Calculator(100, null, '2020-01-01', null);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('missing parameter [investmentDate]');
});

test('should return a missing parameter error [cdbRate]', () => {
    const calculator = new Calculator(null, '2020-01-01', '2020-01-01', null);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('missing parameter [cdbRate]');
});

test('should return a missing parameter error [currentDate]', () => {
    const calculator = new Calculator(100, '2020-01-01', null, null);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('missing parameter [currentDate]');
});

test('should return a invalid date format error [investmentDate]', () => {
    const calculator = new Calculator(100, '20-01-0111', '2020-01-01', null);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('invalid date format [investmentDate]');
});

test('should return a invalid date format error [currentDate]', () => {
    const calculator = new Calculator(100, '2020-01-01', '201-1-1', null);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('invalid date format [currentDate]');
});

test('should return a invalid value type [cdbRate]', () => {
    const calculator = new Calculator('100', '2020-01-01', '2020-01-01', null);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('invalid cdbRate value');
});

test('should return a invalid date error [currentDate < investmentDate]', () => {
    const calculator = new Calculator(100, '2020-01-01', '2019-01-01', null);
    const result = calculator.validateParams();

    expect(result.valid).toBe(false);
    expect(result.message).toBe('invalid date error [currentDate must be greater than invesmentDate]');
});

test('should return valid parameters', () => {
    const calculator = new Calculator(100, '2020-01-01', '2020-01-01', null);
    const result = calculator.validateParams();

    expect(result.valid).toBe(true);
});

test('should return a CDI tax value', () => {
    const calculator = new Calculator(100, '2020-01-01', '2020-01-01', null);
    const result = calculator.getCDITaxValue(17.17);

    expect(result).toBe(0.00062899);
});

test('should return a valid TCDI Tax Accumulated value', () => {
    const calculator = new Calculator(103.5, '2016-11-14', '2016-12-26', null);
    const tcdi = calculator.getCDITaxValue(13.88);
    const result = calculator.getTCDIAccumulatedValue(1, tcdi, 103.5);

    expect(result).toBe(1.0005339668500000);
});

test('should return a CDB history between investmentDate and currentDate', async () => {
    const prices = await getJSONPricesFromCsv('./data/cdi-prices.test.csv');
    const calculator = new Calculator(103.5, '2016-11-14', '2016-12-26', prices);
    const result = calculator.getCDITaxHistory();
    const firstValue = result[0];
    const lastValue = result[result.length - 1];

    expect(result.length).toBe(29);
    expect(firstValue.date).toBe('2016-11-14');
    expect(firstValue.unitPrice).toBe(1000.53397);
    expect(lastValue.date).toBe('2016-12-23');
    expect(lastValue.unitPrice).toBe(1015.44545);
});
