import { toast, ToastContainer } from 'react-nextjs-toast'

export const handleToastMessage = (type, message) => {
    switch (type) {
        case 'info':
          toast.notify(message, {
            duration: 5,
            type: "info",
            position:	'top'
          })
          break;
        case 'success':
          toast.notify(message, {
            duration: 5,
            type: "success",
            position:	'top'
          })
          break;
        case 'warning':
          toast.notify(message, {
            duration: 5,
            type: "warning",
            position:	'top'
          })
          break;
        case 'error':
          toast.notify(message, {
            duration: 5,
            type: "error",
            position:	'top'
          })
          break;
      }
}
export const removeToastMessage = () => {
  toast.remove()
}