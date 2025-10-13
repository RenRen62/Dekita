/* eslint-disable functional/functional-parameters, functional/no-expression-statements, functional/no-conditional-statements */
import {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
  ResourceNotFoundException
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: 'ap-northeast-1',
  endpoint: 'http://localhost:8000',
  credentials: {
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy'
  }
});

async function createMainTable() {
  const tableName = 'main';

  try {
    await client.send(new DescribeTableCommand({ TableName: tableName }));
    console.log(`Table ${tableName} already exists`);
    return;
  } catch (error) {
    if (!(error instanceof ResourceNotFoundException)) {
      throw error;
    }
  }

  const createTableParams = {
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: 'pk',
        AttributeType: 'S' as const
      },
      {
        AttributeName: 'sk',
        AttributeType: 'S' as const
      }
    ],
    KeySchema: [
      {
        AttributeName: 'pk',
        KeyType: 'HASH' as const
      },
      {
        AttributeName: 'sk',
        KeyType: 'RANGE' as const
      }
    ],
    BillingMode: 'PROVISIONED' as const,
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  };

  try {
    await client.send(new CreateTableCommand(createTableParams));
    console.log(`Table ${tableName} created successfully`);
  } catch (error) {
    console.error(`Error creating table ${tableName}:`, error);
    throw error;
  }
}

async function main() {
  try {
    await createMainTable();
    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { createMainTable };
