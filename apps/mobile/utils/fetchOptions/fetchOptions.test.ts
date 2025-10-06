/* eslint-disable */
import { fetchOptions } from './fetchOptions';
/* eslint-enable */

describe('fetchOptions', () => {
  test('戻り値が正しいか', () => {
    expect(fetchOptions).toEqual({
      validateStatus: expect.any(Function),
      transformRequest: expect.any(Array),
      paramsSerializer: expect.any(Function)
    });
  });

  test('ステータスコード200以上300未満の確認', () => {
    const validateStatus = fetchOptions.validateStatus;
    expect(validateStatus(199)).toBe(false);
    expect(validateStatus(200)).toBe(true);
    expect(validateStatus(201)).toBe(true);
    expect(validateStatus(299)).toBe(true);
    expect(validateStatus(300)).toBe(false);
  });

  test('transformRequest(data is not undefined))', () => {
    const transformRequest = fetchOptions.transformRequest[0];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const jsonData = transformRequest!(
      JSON.stringify({ gender: '男', address: '' })
    );
    if (jsonData === undefined) {
      throw new Error('jsonData is undefined');
    }
    const objectData = JSON.parse(jsonData);

    expect(objectData.gender).toMatch('男');
    expect(objectData.address).toBe(undefined);
  });

  test('transformRequest(data is undefined))', () => {
    const transformRequest = fetchOptions.transformRequest[0];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const jsonData = transformRequest!(undefined);
    expect(jsonData).toBe(undefined);
  });

  test('paramsSerializer', () => {
    const paramsSerializer = fetchOptions.paramsSerializer;
    const params = paramsSerializer({ gender: '男', address: '' });
    expect(params).toMatch('gender');
    expect(params).not.toMatch('address');
  });
});
