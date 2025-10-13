import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_vhqx1l } from './notification';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/notification';
  const POST = 'POST';

  return {
    notification: {
      /**
       * プッシュ通知送信
       * @returns 成功
       */
      post: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_vhqx1l['post']['resBody'], BasicHeaders, Methods_vhqx1l['post']['status']>(prefix, PATH0, POST, option).json(),
      /**
       * プッシュ通知送信
       * @returns 成功
       */
      $post: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_vhqx1l['post']['resBody'], BasicHeaders, Methods_vhqx1l['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
