const fs = require('fs');
const MarketData = require('../src/lib/market-data');
const csvPath = './__tests__/fake.csv';

beforeAll(async () => {
    await fs.promises.writeFile(csvPath, 'sSecurityName,dtDate,dLastTradePrice\r\nCDI,03/12/2019,4.9\r\nCDI,02/12/2019,4.9\r\n');
});

afterAll(async () => {
    await fs.promises.unlink(csvPath);
});

test('should load an invalid file', async () => {
    const marketData = new MarketData();

    try {
        await marketData.loadData('invalid/path');
    } catch (error) {
        expect(error.message).toBe('invalid csv path');
    }

});

test('should load a valid file', async() => {
    const marketData = new MarketData();
    await marketData.loadData(csvPath);
    const prices = marketData.getJSONPrices();

    expect(Object.keys(prices).length).toBe(2);
    expect(prices['03/12/2019']).toBe(4.9);
});
