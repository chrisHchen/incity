export const regValid = (regexp, str) => {
	return regexp.test(str)
}

export const requestAnimationFramePollyfill = () => {
	(function() {
    var lastTime = 0
    var vendors = ['webkit', 'moz']
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame']
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime()
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall)
            }, timeToCall)
            lastTime = currTime + timeToCall
            return id
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id)
        }
    }
	}())
}

//reactTransitionGroup
export const processAnimation = (el, firstClass, activeClass, timeout, callback) => {
	el.classList.add(firstClass)
	const tick = () =>{
		el.classList.add(activeClass)
	}
	setTimeout(tick, 0)
	// const temp = el.offsetTop
	setTimeout(function(){
			callback && callback()
			el.classList.remove(firstClass, activeClass)
	}, timeout)
}

//validation
export const validate = (data,callback) => {
    let isValid = true
    Object.keys(data).forEach((key, index) => {
        const item = data[key]
        if(item.data_rule && item.value){
            if(!item.data_rule.test(item.value)){
                callback(item.data_message)
                isValid = false
                return
            }
        }else{//message or value is undefined or ''
            callback(item.data_message)
            isValid = false
            return
        }
    })
    return isValid
}

//destruct form data
export const destructFormData = (data) => {
    const ret = {}
    Object.keys(data).forEach( (item, index) => {
        ret[item] = data[item].value
    })
    return ret
}