import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = (type, message) => {
    switch (type) {
        case 'info':
            toast.info(message, {
                position: 'top-center'
            });
            break;
        case 'success':
            toast.success(message, {
                position: 'top-center'
            });
            break;
        case 'warning':
            toast.warning(message, {
                position: 'top-center'
            });
            break;
        case 'error':
            toast.error(message, {
                position: 'top-center'
            });
            break;
        default:
            break;
    }
};

export default ToastNotification;
