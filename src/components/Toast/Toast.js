import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Toast = (success, error) => {
	
	if(success) {

		toast.info(`${success}`, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	} else if(error) {

		toast.error(`${error}`, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	}
}


export default Toast;