import { toast } from "react-toastify";

const toastService = (msg, status) => {
    switch (status) {
        case 'success':
            return toast.success(msg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'toast-message toast-success'
            });
        case 'error':
            return toast.error(msg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'toast-message toast-error'
            });
        case 'info':
            return toast.info(msg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'toast-message toast-info'
            });
        default:
            break;
    }
}
export default toastService;