module.exports = {
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  input: 'apis/bin/openapi/',
  outputEachDir: true,
  openapi: { inputFile: '../lambda/docs/openapi.yaml' }
};
