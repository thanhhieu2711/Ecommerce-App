import { Toaster } from 'react-hot-toast';
import { toastConfig } from '@/configs/toastConfig';
export const Toast = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={toastConfig}
        />
    );
};

export default Toast;
