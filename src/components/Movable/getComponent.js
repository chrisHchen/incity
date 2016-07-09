import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import touchStyles from './style'

const _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }

const getComponent = (decorator) => {
	return (
		@decorator
		class Movable extends Component{
			constructor(props) {
	    	super(props)
	    	this.state = {
	    		isActive: false,
	    		isMovable: false,
	    		top:0,
	    		left:0
	    	}

	    	this.handlersObj = this.handlers()
				const keys = Object.keys(this.handlersObj)
				keys.forEach((key, _) => {
					this.handlersObj[key] = this.handlersObj[key].bind(this)
				})
	  	}

			static propTypes = {
				component: PropTypes.any,           // component to create
				className: PropTypes.string,        // optional className
				classBase: PropTypes.string,        // base for generated classNames
				classes: PropTypes.object,          // object containing the active and inactive class names
				style: PropTypes.object,            // additional style properties for the component
				movableClass: PropTypes.string,        // optional className when it is movable
				onComplete: PropTypes.func,          //complete hook
				shouldReverse: PropTypes.bool,
				destination:PropTypes.array         //complete hook
			}

			static defaultProps = {
				component: 'span',
				classBase: 'movable',
				pressDelay: 800,
				moveThreshold: 10,
				pressMoveThreshold: 5,
				movableClass: 'shaking',
				stopPropagation: true,
				preventDefault: true,
				shouldReverse: false
			}

			render(){
				const props = this.props
				const classnameObj = {
					[`${props.classBase + (this.state.isActive ? '-active' : '-inactive')}`] 		: true,
					[props.className] 																													: !!props.className,
					[props.movableClass]																												: !! this.state.isMovable
				}

				if(props.classes){
					classnameObj[`${this.state.isActive ? props.classes.active : props.classes.inactive}`] 	= true
				}

				const classname = classnames(classnameObj)
				
				const style = {}
				

				_extends(style, touchStyles, {left:this.state.left + 'px', top:this.state.top + 'px'}, props.style)

				const newComponentProps = _extends({}, props, {
					style: style,
					className: classname,
				}, this.handlersObj )
				
				//landing not success so go back to where it was positioned
				if(props.shouldReverse && this._landing && this._successIndex < 0){
					_extends(style, {
														transition:'left 0.3s ease-out,top 0.3s ease-out,transform 0.3s ease-out',
													  WebkitTransition:'left 0.3s ease-out,top 0.3s ease-out,transform 0.3s ease-out',
														left:this._initLeft,
														top:this._initTop,
														transform:'translateZ(1px)',
														WebkitTransform:'translateZ(1px)'})

					this.state.left = this._initLeft
					this.state.top = this._initTop
				}
				//landing success

				if( props.shouldReverse && this._landing && this._successIndex >= 0){
					const diffLeft = this.props.destination[this._successIndex].x - (this._thisOffsetLeft + this._thisWidth/2)
					const diffTop = this.props.destination[this._successIndex].y - (this._thisOffsetTop + this._thisHeight/2)
					
					_extends(style, {
														transition:'left 0.3s ease-out,top 0.3s ease-out,transform 0.3s ease-out',
													  WebkitTransition:'left 0.3s ease-out,top 0.3s ease-out,transform 0.3s ease-out',
														left:this.state.left + diffLeft+ 'px',
														top:this.state.top + diffTop+ 'px',
														transform:'translateZ(1px)',
														WebkitTransform:'translateZ(1px)'})

					this.state.left = this.state.left + diffLeft
					this.state.top = this.state.top + diffTop
				}

				delete newComponentProps.onTap
				delete newComponentProps.onPress
				delete newComponentProps.pressDelay
				delete newComponentProps.pressMoveThreshold
				delete newComponentProps.moveThreshold
				delete newComponentProps.onMoveEnd
				delete newComponentProps.preventDefault
				delete newComponentProps.stopPropagation
				delete newComponentProps.component
				delete newComponentProps.classBase
				delete newComponentProps.movableClass
				delete newComponentProps.shouldReverse 
				delete newComponentProps.destination

				return React.createElement(props.component, newComponentProps, props.children)
			}
		})
}

export default getComponent