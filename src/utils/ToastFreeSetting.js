import { toast } from "react-toastify"

/** @description import 'react-toastify/dist/ReactToastify.css'; */
const toastSuccess = (successMsg) => {
  toast.success(successMsg, {
    position: toast.POSITION.TOP_CENTER,
    toastId: 'empty-comment-toast',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

/** @description import 'react-toastify/dist/ReactToastify.css'; */
const toastError = (errorMsg) => {
  toast.error(errorMsg, {
    position: toast.POSITION.TOP_CENTER,
    toastId: 'empty-comment-toast',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}


export { toastSuccess, toastError }