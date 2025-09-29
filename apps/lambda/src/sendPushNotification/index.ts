import { testUtilFunction } from '/opt/nodejs/utils';

type Event = { url: string };

export const handler = sendPushNotification;

/**
 * 定時処理用のAPIを呼び出すlambda関数
 * CI/CD検証用
 */
async function sendPushNotification(event: Event) {
  const { url } = event;

  try {
    console.log('Function Called!');
    testUtilFunction();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'POST request was successful',
        responseData: url
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to send POST request',
        error: error
      })
    };
  }
}
