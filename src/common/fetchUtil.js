import fetch from 'isomorphic-fetch'

//https://github.com/github/fetch
export const fetchJson = ({ url, type, data, isCookie = true, isCORS = false, success, error }) => {
	fetch( url, {
			method: type,
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json;charset=utf-8'
		  },
			body : JSON.stringify( data ),
			credentials: isCookie ? 'same-origin' : (isCORS ? 'include' : undefined)
		})
		.then( checkStatus )
		.then( parseJSON )
		.then( (res) => {
			success(res)
		})
		.catch( error ? error : defaultErrorhandle )
}

export const checkStatus = (response) => {
	if(!response) return 
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = (response) => {
  return response.json()
}

const defaultErrorhandle = (error) => {
	console.log('request failed', error)
}
