import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandOutput,
  GetCommand
} from '@aws-sdk/lib-dynamodb';

type DynamoDBKey = {
  pk: string;
  sk?: string;
};

/**
 * DynamoDBにデータを追加する関数
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addDataToDynamoDB<T extends Record<string, any>>(
  docClient: DynamoDBDocumentClient,
  tableName: string,
  item: T
): Promise<PutCommandOutput> {
  const command = new PutCommand({
    TableName: tableName,
    Item: item
  });

  return await docClient.send(command);
}

/**
 * DynamoDBからデータを取得する関数
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getDataFromDynamoDB<T extends Record<string, any>>(
  docClient: DynamoDBDocumentClient,
  tableName: string,
  key: DynamoDBKey
): Promise<T | undefined> {
  const command = new GetCommand({
    TableName: tableName,
    Key: key
  });

  const result = await docClient.send(command);
  return result.Item as T | undefined;
}
