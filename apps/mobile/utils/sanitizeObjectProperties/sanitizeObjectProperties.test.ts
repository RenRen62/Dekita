import { sanitizeObjectProperties } from './sanitizeObjectProperties';

describe('sanitizeObjectProperties', () => {
  test('空文字のプロパティがundefinedになっているか', () => {
    const obj = {
      name: 'Taro',
      age: 12,
      gender: null,
      note: '',
      color: ''
    };

    const expected = {
      name: 'Taro',
      gender: null,
      age: 12
    };

    expect(sanitizeObjectProperties(obj)).toEqual(expected);
  });
});
