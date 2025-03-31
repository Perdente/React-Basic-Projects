import { Toaster } from 'react-hot-toast';
// https://react-hot-toast.com/docs/toaster

const Toast = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{ margin: '8px' }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: '16px',
          maxWidth: '500px',
          padding: '16px 24px',
          backgroundColor: 'var(--color-grey-0)',
          color: 'var(--color-grey-700)',
        },
      }}
    />
  );
};

export default Toast;
