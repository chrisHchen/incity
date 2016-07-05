import ReactTransitionGroup from 'react-addons-transition-group'
import React,{ Component, PropTypes } from 'react'

class TransitionGroupImp extends Component{

	render{
		const { component, classname, children, cwaCallback, cdlCallback } = this.props
		<ReactTransitionGroup 
			component={component} 
			className={classname}
			componentWillAppear={cwaCallback}
			componentDidLeave={cdlCallback}>
			{children}
		</ReactTransitionGroup>
	}
}
