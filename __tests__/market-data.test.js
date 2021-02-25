const fs = require('fs');
const csvPath = './__tests__/fake.csv';

beforeAll(async () => {
    await fs.promises.writeFile(csvPath, 'sSecurityName,dtDate,dLastTradePrice\r\nCDI,03/12/2019,4.9\r\nCDI,02/12/2019,4.9\r\n');
});

afterAll(async () => {
    await fs.promises.unlink(csvPath);
});

test('should load an invalid file', () => {

});

test('should load a valid file', () => {

});
