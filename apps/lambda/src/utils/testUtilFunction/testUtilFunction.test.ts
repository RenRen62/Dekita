import { testUtilFunction } from './testUtilFunction';

describe('testUtilFunction', () => {
  it('正常系', () => {
    const result = testUtilFunction();
    expect(result).toBe(true);
  });
});
