import { Qiniu_UploadUrl } from '../config/qiniu'

export const asyncUpload = function(token) {
    const UploadUrl = Qiniu_UploadUrl
    //普通上传
    const Qiniu_upload = function(f, token, key) {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', UploadUrl, true)
        const formData
        formData = new FormData()
        if (key !== null && key !== undefined) formData.append('key', key);
        formData.append('token', token)
        formData.append('file', f)

        xhr.onreadystatechange = function(response) {
            if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
                var blkRet = JSON.parse(xhr.responseText);
                console && console.log(blkRet);
            } else if (xhr.status != 200 && xhr.responseText) {

            }
        }

        xhr.send(formData)
    }
    
    if (this.files.length > 0 && token != "") {
        Qiniu_upload(this.files[0], token);
    } else {
        console && console.log("form input error");
    }
}