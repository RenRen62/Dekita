import { handler } from './index';

describe('sendPushNotification', () => {
  test('正常系', async () => {
    const url = 'https://example.com';
    const event = { url };

    const response = await handler(event);
    expect(response.statusCode).toBe(200);
  });

  test('異常系 - 500', async () => {
    const url = 'https://example.com';
    const event = { url };

    // testUtilFunctionがthrowするようにモック
    jest.spyOn(console, 'log').mockImplementation(() => {
      throw new Error('Mocked error');
    });

    const response = await handler(event);
    expect(response.statusCode).toBe(500);
  });
});
