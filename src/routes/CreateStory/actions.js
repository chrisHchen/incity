import { asyncUpload } from '../../common/ajaxupload'
import { fetchJson } from '../../common/fetchUtil' 

export const upload = (target) => {
	return (disptach, getState) => {
		fetchJson({
			url : '/upload/getuptoken',
			type: 'GET',
			success : (res) => {
				if(res.isSuccess && res.token){
					asyncUpload( res.token, target )
				}
			}
		})
	}
}