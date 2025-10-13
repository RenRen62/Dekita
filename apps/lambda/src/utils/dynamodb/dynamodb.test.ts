import { addDataToDynamoDB, getDataFromDynamoDB } from './dynamodb';
import { testDocClient } from './testClient';

describe('DynamoDB Utils', () => {
  const tableName = 'main';

  describe('addDataToDynamoDB', () => {
    it('正常系', async () => {
      const item = {
        pk: 'test-pk',
        sk: 'test-sk',
        data: 'test-data'
      };

      const res = await addDataToDynamoDB(testDocClient, tableName, item);
      expect(res.$metadata.httpStatusCode).toBe(200);
    });
  });

  describe('getDataFromDynamoDB', () => {
    it('正常系', async () => {
      const item = {
        pk: 'test-pk',
        sk: 'test-sk'
      };

      const res = await getDataFromDynamoDB(testDocClient, tableName, item);

      expect(res?.pk).toBe('test-pk');
      expect(res?.sk).toBe('test-sk');
      expect(res?.data).toBe('test-data');
    });
  });
});
