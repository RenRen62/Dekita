import { testUtilFunction } from '/opt/nodejs/utils';

// CI/CD検証用コメント

type Event = { url: string };

export const handler = sendPushNotification;

/**
 * サンプル Lambda 関数
 */
async function sendPushNotification(event: Event) {
  const { url } = event;

  try {
    // eslint-disable-next-line functional/no-expression-statements
    console.log('Function Called!');

    // eslint-disable-next-line functional/no-expression-statements
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
