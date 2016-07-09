import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import domUtil from '../../common/domUtil'

const _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }

function getTouchProps(touch) {
	if (!touch) return {}
	return {
		pageX: touch.pageX,
		pageY: touch.pageY,
		clientX: touch.clientX,
		clientY: touch.clientY
	}
}

function Decorator(target){

	target.prototype = _extends(target.prototype,{

		componentDidMount(){
				this._node = ReactDOM.findDOMNode(this)
				//save the init position for onComplete hook
				this._initLeft = this.props.style.left || getComputedStyle(this._node)['left']
				this._initTop = this.props.style.top || getComputedStyle(this._node)['top']
		},

		componentWillUnmount() {
			this.cleanupScrollDetection()
			this.cancelPressDetection()
			this.clearActiveTimeout()
			this._left = null
			this._top = null
		},

		processEvent(event) {
			if (this.props.preventDefault) event.preventDefault()
			if (this.props.stopPropagation) event.stopPropagation()
		},

		onTouchStart(event) {
			//fire native touchStart and if it returns false then return as to stop the immediate propagation
			if (this.props.onTouchStart && this.props.onTouchStart(event) === false) return
			this.processEvent(event)
			if (event.touches.length === 1) {
				this._initialTouch = this._lastTouch = getTouchProps(event.touches[0])
				this.initScrollDetection()
				this.initPressDetection(event)
				this._activeTimeout = setTimeout(this.makeActive.bind(this), 0)
				this._ticking = false // requestAnimationFrame ticking flag 
				this._movement = 0
				this._landing = false // if landed
				this._successIndex = -1 // index of destination which is landed in 
				this._initPosition = {
					x:parseInt(getComputedStyle(this._node)['left']),
					y:parseInt(getComputedStyle(this._node)['top'])
				}
			}
		},

		makeActive() {
			this.clearActiveTimeout()
			this.setState({
				isActive: true
			})
		},

		clearActiveTimeout() {
			clearTimeout(this._activeTimeout)
			this._activeTimeout = false
		},

		initScrollDetection() {
			this._scrollPos = { top: 0, left: 0 }
			this._scrollParents = []
			this._scrollParentPos = []
			let node = this._node

			while (node) {
				if (node.scrollHeight > node.offsetHeight || node.scrollWidth > node.offsetWidth) {
					this._scrollParents.push(node);
					this._scrollParentPos.push(node.scrollTop + node.scrollLeft)
					this._scrollPos.top += node.scrollTop
					this._scrollPos.left += node.scrollLeft
				}

				node = node.parentNode
			}
		},

		calculateAbsoluteMovement(touch) {
			return {
				x: Math.abs(touch.clientX - this._initialTouch.clientX),
				y: Math.abs(touch.clientY - this._initialTouch.clientY)
			}
		},

		calculateMovement(touch) {
			return {
				x: touch.clientX - this._initialTouch.clientX,
				y: touch.clientY - this._initialTouch.clientY
			}
		},

		detectScroll() {
			const currentScrollPos = { top: 0, left: 0 }
			for (let i = 0; i < this._scrollParents.length; i++) {
				currentScrollPos.top += this._scrollParents[i].scrollTop
				currentScrollPos.left += this._scrollParents[i].scrollLeft
			}
			return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left)
		},

		cleanupScrollDetection() {
			this._scrollParents = undefined
			this._scrollPos = undefined
		},

		initPressDetection(event, callback) {
			this._pressTimeout = setTimeout((function () {
				this.props.onPress && this.props.onPress(event)
				
				//now it can be moved
				this.setState({
					isMovable: true
				})
				callback && callback()
			}).bind(this), this.props.pressDelay)
		},

		cancelPressDetection() {
			clearTimeout(this._pressTimeout)
		},

		onTouchMove(event) {
			if (this._initialTouch) {
				this.processEvent(event)

				if (this.detectScroll()) return this.endTouch(event)
				//fire native touchMove handler
				this.props.onTouchMove && this.props.onTouchMove(event)
				this._lastTouch = getTouchProps(event.touches[0])
				//not movable yet
				if(!this.state.isMovable){
					const movement = this.calculateAbsoluteMovement(this._lastTouch)
					if (movement.x > this.props.pressMoveThreshold || movement.y > this.props.pressMoveThreshold) {
						this.cancelPressDetection()
					}
					if (movement.x > this.props.moveThreshold || movement.y > this.props.moveThreshold) {
						if (this.state.isActive) {
							this.setState({
								isActive: false
							})
						} else if (this._activeTimeout) {
							this.clearActiveTimeout()
						}
					} else { //if moved a little and is not active yet, set it to active(basically impossible when activeTimeout set to 0)
						if (!this.state.isActive && !this._activeTimeout) {
							this.setState({
								isActive: true
							})
						}
					}
				} else { //now it is movable
					this._movement = this.calculateMovement(this._lastTouch)
						//delete the initial left and top from props so it wont effect movement result
						delete this.props.style.left
						delete this.props.style.top
						this._initialTouch = this._lastTouch
						this.requestTick()
				}
			}
		},

		requestTick(){
			if(!this._ticking) {
        requestAnimationFrame(this.update.bind(this))
    	}
    	this._ticking = true
		},

		update(){
			this._ticking = false

			this.setState({
				left:this._initPosition.x + this._movement.x,
				top:this._initPosition.y + this._movement.y
			})
			this._initPosition.x += this._movement.x
			this._initPosition.y += this._movement.y
		},

		onTouchEnd(event) {
			const _this = this
			
			if (this._initialTouch) {

				this.processEvent(event)
				let afterEndTouch
				const movement = this.calculateAbsoluteMovement(this._lastTouch)
				//fire onTap(basically not used here)
				if (movement.x <= this.props.moveThreshold && movement.y <= this.props.moveThreshold && this.props.onTap) {
					event.preventDefault()
					afterEndTouch = function () {
						const finalParentScrollPos = _this._scrollParents.map(function (node) {
							return node.scrollTop + node.scrollLeft
						})
						const stoppedMomentumScroll = _this._scrollParentPos.some(function (end, i) {
							return end !== finalParentScrollPos[i]
						})
						if (!stoppedMomentumScroll) {
							_this.props.onTap(event)
						}
					}
				}
				this.endTouch(event, afterEndTouch)
			}
		},

		endTouch(event, callback) {
			this.cancelPressDetection()
			this.clearActiveTimeout()
			if (event && this.props.onTouchEnd) {
				//fire native touchEnd handler
				this.props.onTouchEnd(event)
			}
			this._initialTouch = null
			this._lastTouch = null
			this._ticking = null
			this._movement = null
			this._initPosition = null

			if (callback) {
				callback()
			}
			//if no reverse
			if (!this.props.shouldReverse) {
				this.setState({
					isActive: false,
					isMovable:false
				})
			}else{
				this._landing = true
				this._successIndex = this.isIn()
				this.setState({
					isActive: false,
					isMovable:false
				})
				
			}
			this.props.onComplete && this.props.onComplete()
		},

		isIn(){
			this._thisOffsetLeft = domUtil.getLeft(this._node)
			this._thisOffsetTop = domUtil.getTop(this._node)
			this._thisWidth = parseInt(getComputedStyle(this._node).width)
			this._thisHeight = parseInt(getComputedStyle(this._node).height)
			let _successIndex = -1
			this.props.destination.forEach((item, index) => {
				if( (item.x > this._thisOffsetLeft && item.x < this._thisOffsetLeft + this._thisWidth) &&
					  (item.y > this._thisOffsetTop && item.y < this._thisOffsetTop + this._thisHeight)){
					//return the first matched destination
					_successIndex = index
					return
				}
			})
			return _successIndex
		}

	})
	
	target.prototype.handlers = () => {
		return {
			onTouchStart: target.prototype.onTouchStart,
			onTouchMove: target.prototype.onTouchMove,
			onTouchEnd: target.prototype.onTouchEnd
		}
	}
}

export default Decorator