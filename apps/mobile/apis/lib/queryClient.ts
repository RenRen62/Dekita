import { QueryClient, DefaultOptions } from 'react-query';

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: (error) =>
      // @ts-expect-error
      error?.response?.status >= 500,
    refetchOnWindowFocus: false,
    retry: false,
    keepPreviousData: true,
    cacheTime: 1000
  },
  mutations: {
    useErrorBoundary: (error) =>
      // @ts-expect-error
      error?.response?.status >= 500,
    retry: false
  }
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
