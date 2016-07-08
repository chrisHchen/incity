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
	    		isActive: false
	    	}

	    	this.handlersObj = this.handlers()
				const keys = Object.keys(this.handlersObj)
				keys.forEach((key, _) => {
					this.handlersObj[key] = this.handlersObj[key].bind(this)
				})
	  	}

			static propTypes = {
				component: React.PropTypes.any,           // component to create
				className: React.PropTypes.string,        // optional className
				classBase: React.PropTypes.string,        // base for generated classNames
				classes: React.PropTypes.object,          // object containing the active and inactive class names
				style: React.PropTypes.object,            // additional style properties for the component
			}

			static defaultProps = {
				component: 'span',
				classBase: 'movable',
				pressDelay: 1000,
				moveThreshold: 100,
				pressMoveThreshold: 5
			}

			render(){
				const props = this.props
				const classnameObj = {
					[`${props.classBase + (this.state.isActive ? '-active' : '-inactive')}`] 		: true,
					[props.className] 																													: !!props.className
				}

				if(props.classes){
					classnameObj[`${this.state.isActive ? props.classes.active : props.classes.inactive}`] 	= true
				}

				const classname = classnames(classnameObj)

				const style = {}
				_extends(style, touchStyles, props.style)

				const newComponentProps = _extends({}, props, {
					style: style,
					className: classname,
				}, this.handlersObj )
				
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

				return React.createElement(props.component, newComponentProps, props.children)
			}
		})
}

export default getComponent