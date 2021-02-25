const { getJSONPricesFromCsv } = require('../src/lib/market-data');
const csvPath = './data/cdi-prices.test.csv';

test('should load an invalid file', async () => {
    try {
        await getJSONPricesFromCsv('invalidpath');
    } catch (error) {
        expect(error.message).toBe('invalid csv path');
    }

});

test('should load a valid file', async() => {
    const prices = await getJSONPricesFromCsv(csvPath);

    expect(Object.keys(prices).length).toBe(29);
    expect(prices['2016-11-14']).toBe(13.88);
});
