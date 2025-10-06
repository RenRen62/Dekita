import qs from 'qs';
import { sanitizeObjectProperties } from '../sanitizeObjectProperties';

export const fetchOptions = {
  validateStatus: (status: number) => status >= 200 && status < 300,
  transformRequest: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      if (data !== undefined) {
        return JSON.stringify(sanitizeObjectProperties(JSON.parse(data)));
      }
    }
  ],
  paramsSerializer: (params: { [key: string]: unknown }) =>
    // eslint-disable-next-line import/no-named-as-default-member
    qs.stringify(sanitizeObjectProperties(params), {
      arrayFormat: 'comma'
    })
};
