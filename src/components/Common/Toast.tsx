import { Toaster } from 'react-hot-toast';
import { toastConfig } from '@/configs/toastConfig';
export const Toast = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={toastConfig}
            gutter={10}
        />
    );
};

export default Toast;
