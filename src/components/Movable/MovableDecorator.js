import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

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
	const mixin = {

		componentWillUnmount: function componentWillUnmount() {
			this.cleanupScrollDetection();
			this.cancelPressDetection();
			this.clearActiveTimeout();
		},

		processEvent: function processEvent(event) {
			if (this.props.preventDefault) event.preventDefault();
			if (this.props.stopPropagation) event.stopPropagation();
		},

		onTouchStart: function onTouchStart(event) {
			//fire native touchStart and if it returns false then return as to stop the immediate propagation
			if (this.props.onTouchStart && this.props.onTouchStart(event) === false) return
			this.processEvent(event)
			window._blockMouseEvents = true
			if (event.touches.length === 1) {
				this._initialTouch = this._lastTouch = getTouchProps(event.touches[0])
				this.initScrollDetection()
				this.initPressDetection(event, this.endTouch)
				this._activeTimeout = setTimeout(this.makeActive, 0)
			}
		},

		makeActive: function makeActive() {
			if (!this.isMounted()) return
			this.clearActiveTimeout()
			this.setState({
				isActive: true
			})
		},

		clearActiveTimeout: function clearActiveTimeout() {
			clearTimeout(this._activeTimeout)
			this._activeTimeout = false
		},

		initScrollDetection: function initScrollDetection() {
			this._scrollPos = { top: 0, left: 0 }
			this._scrollParents = []
			this._scrollParentPos = []
			let node = ReactDOM.findDOMNode(this)

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

		calculateMovement: function calculateMovement(touch) {
			return {
				x: Math.abs(touch.clientX - this._initialTouch.clientX),
				y: Math.abs(touch.clientY - this._initialTouch.clientY)
			}
		},

		detectScroll: function detectScroll() {
			const currentScrollPos = { top: 0, left: 0 }
			for (let i = 0; i < this._scrollParents.length; i++) {
				currentScrollPos.top += this._scrollParents[i].scrollTop
				currentScrollPos.left += this._scrollParents[i].scrollLeft
			}
			return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left)
		},

		cleanupScrollDetection: function cleanupScrollDetection() {
			this._scrollParents = undefined
			this._scrollPos = undefined
		},

		initPressDetection: function initPressDetection(event, callback) {
			if (!this.props.onPress) return
			this._pressTimeout = setTimeout((function () {
				this.props.onPress(event)
				//now it can be moved
				this._isMovable = true
				callback()
			}).bind(this), this.props.pressDelay)
		},

		cancelPressDetection: function cancelPressDetection() {
			clearTimeout(this._pressTimeout)
		},

		onTouchMove: function onTouchMove(event) {
			if (this._initialTouch) {
				this.processEvent(event)

				if (this.detectScroll()) return this.endTouch(event)
				//fire native touchMove handler
				this.props.onTouchMove && this.props.onTouchMove(event)
				this._lastTouch = getTouchProps(event.touches[0])
				const movement = this.calculateMovement(this._lastTouch)
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
				} else {
					if (!this.state.isActive && !this._activeTimeout) {
						this.setState({
							isActive: true
						})
					}
				}
			}
		},

		onTouchEnd: function onTouchEnd(event) {
			const _this = this

			if (this._initialTouch) {
				this.processEvent(event)
				let afterEndTouch
				const movement = this.calculateMovement(this._lastTouch)
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

		endTouch: function endTouch(event, callback) {
			this.cancelPressDetection()
			this.clearActiveTimeout()
			if (event && this.props.onTouchEnd) {
				//fire native touchEnd handler
				this.props.onTouchEnd(event)
			}
			this._initialTouch = null
			this._lastTouch = null
			if (callback) {
				callback()
			}
			if (this.state.isActive) {
				this.setState({
					isActive: false
				})
			}
		}
	}

	target.handlers = () => {
		return {
			onTouchStart: mixin.onTouchStart,
			onTouchMove: mixin.onTouchMove,
			onTouchEnd: mixin.onTouchEnd,
		}
	}
}

export default Decorator