import { asyncUpload } from '../../common/ajaxupload'
import { fetchJson } from '../../common/fetchUtil' 

export const upload = (target) => {
	return (disptach, getState) => {
		//fetch token
		fetchJson({
			url : '/upload/getuptoken',
			type: 'GET',
			success : (res) => {
				if(res.isSuccess && res.token){
					const length = target.files.length
					const promiseArr = []
					for(let i = 0 ; i < length ; i++){
						const isLast = i == length - 1
						promiseArr.push( new Promise((resolve, reject) => {
							asyncUpload( res.token, target.files[i], resolve, reject, isLast )
						}))
					}
					Promise.all(promiseArr)
					.then( values => {
						console.log(values)
					},(values) => {
						alert('upload error')
					})
				}
			}
		})
	}
}