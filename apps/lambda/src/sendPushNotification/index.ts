import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { addDataToDynamoDB, testUtilFunction } from '/opt/nodejs/utils';
import { docClient } from '/opt/nodejs/utils/dynamodb/client';

// CI/CD検証用コメント

type Event = { url: string };

/**
 * サンプル Lambda 関数
 */
export const sendPushNotification = (docClient: DynamoDBDocumentClient) => {
  return async (event: Event) => {
    const { url } = event;
    try {
      // eslint-disable-next-line functional/no-expression-statements
      testUtilFunction();

      const res = await addDataToDynamoDB(docClient, 'main', {
        pk: `USER#${url}`,
        sk: 'PROFILE',
        url: url
      });

      return {
        statusCode: res.$metadata.httpStatusCode,
        body: JSON.stringify({
          message: 'POST request was successful'
        })
      };
    } catch (error) {
      // eslint-disable-next-line functional/no-expression-statements
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Failed to send POST request'
        })
      };
    }
  };
};

export const handler = sendPushNotification(docClient);
