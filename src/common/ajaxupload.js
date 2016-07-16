import config from '../config/qiniu'

export const asyncUpload = function(token, target, resolve, reject, isLast) {
    const UploadUrl = config.Qiniu_UploadUrl
    //普通上传
    const Qiniu_upload = function(f, token, key) {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', UploadUrl, true)
        const formData = new FormData()
        if (key !== null && key !== undefined) formData.append('key', key)
        formData.append('token', token)
        formData.append('file', f)
        formData.append('x:length', length)
        if(f.size > 4*1024*1024){
            return alert('maximium size for each photo is 2M and ' + f.name + 'has exceeded the limitation')
        }
        xhr.onreadystatechange = function(response) {
            if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
                var blkRet = JSON.parse(xhr.responseText)

                if(isLast) return resolve(blkRet)
                resolve()
                //console && console.log(blkRet)
            } else if(xhr.status == 403) {
                reject(xhr.responseText)
                //上传文件类型不正确
            } else if (xhr.status != 200 && xhr.responseText) {
                reject(xhr.responseText)
            }
        }
        xhr.send(formData)
    }

    if (target && token != "") {
        Qiniu_upload( target, token )
    } else {
        console && console.log("form input error")
    }
}
