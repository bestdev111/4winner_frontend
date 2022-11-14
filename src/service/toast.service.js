import { toast } from "react-toastify";

const toastService = (msg) => {
    return toast.success(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'toast-message'
    });;
}
export default toastService;