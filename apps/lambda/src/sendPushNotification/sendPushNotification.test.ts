import { testDocClient } from '../utils/dynamodb/testClient';
import { sendPushNotification } from './index';

describe('sendPushNotification', () => {
  test('正常系', async () => {
    const url = 'https://sendーpush-notification-normal-case.com';
    const event = { url };

    const handler = sendPushNotification(testDocClient);
    const response = await handler(event);
    expect(response.statusCode).toBe(200);
  });

  test('異常系 - 500', async () => {
    const url = 'https://sendーpush-notification-error-case.com';
    const event = { url };

    // testUtilFunctionがthrowするようにモック
    jest.spyOn(console, 'log').mockImplementation(() => {
      throw new Error('Mocked error');
    });
    const handler = sendPushNotification(testDocClient);
    const response = await handler(event);

    expect(response.statusCode).toBe(500);
  });
});
