import React from 'react';
import GlobalStyles from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Toast from './ui/Toast';
import AppRoutes from './AppRoutes';
import { DarkModeProvider } from './contexts/DarkModeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, // the data is fresh for 60 sec as if it was just fetched from query function
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <AppRoutes />
        <Toast />
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

export default App;

