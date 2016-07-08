import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import touchStyles from './style'

const _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }

export default getComponent = (decorator) => {
	
	return (
	@decorator
	class Movable extends Component{
		constructor(props) {
    	super(props)
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
			pressMoveThreshold: 5,
			isActive: false
		}

		render(){
			const props = this.props

			const classname = classnames({
				[`${props.classBase + (this.state.isActive ? '-active' : '-inactive')}`] 		: true,
				[props.className] 																													: !!props.className,
				[`${this.state.isActive ? props.classes.active : props.classes.inactive}`] 	: !!props.classes
			})

			const style = {}
			_extends(style, touchStyles, props.style)

			const newComponentProps = _extends({}, props, {
				style: style,
				className: className,
				handlers: this.handlers
			}, this.handlers())

			delete newComponentProps.onTap
			delete newComponentProps.onPress
			delete newComponentProps.pressDelay
			delete newComponentProps.pressMoveThreshold
			delete newComponentProps.moveThreshold
			delete newComponentProps.onMoveEnd
			delete newComponentProps.preventDefault
			delete newComponentProps.stopPropagation
			delete newComponentProps.component

			return React.createElement(props.component, newComponentProps, props.children)
		}
	})
}