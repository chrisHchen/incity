import config from '../config/qiniu'

export const asyncUpload = function(token, target) {
    const UploadUrl = config.Qiniu_UploadUrl
    //普通上传
    const Qiniu_upload = function(f, token, key) {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', UploadUrl, true)
        const formData = new FormData()
        if (key !== null && key !== undefined) formData.append('key', key)
        formData.append('token', token)
        formData.append('file', f)

        xhr.onreadystatechange = function(response) {
            if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
                var blkRet = JSON.parse(xhr.responseText)
                console && console.log(blkRet)
            } else if(xhr.status == 403) {
                //上传文件类型不正确
            } else if (xhr.status != 200 && xhr.responseText) {

            }
        }
        xhr.send(formData)
    }
    
    if (target.files.length > 0 && token != "") {
        Qiniu_upload(target.files[0], token);
    } else {
        console && console.log("form input error")
    }
}
