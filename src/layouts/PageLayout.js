import React,{ Component, PropTypes } from 'react'
import classnames from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// const FirstChild = React.createClass({
//   render: function() {
//     var children = React.Children.toArray(this.props.children);
//     return children[0] || null;
//   }
// })

class PageLayout extends Component{
	render(){
		const {cls, transitionName='fadeInOut'} = this.props
		const clsName = classnames({
			'pageLayout' : true,
			'cls'       : !!cls
		})
		return(
		  	<ReactCSSTransitionGroup 
		  		className= { clsName }
		  		component='div' 
		  		transitionName={transitionName} 
		  		transitionAppear={true} 
		  		transitionAppearTimeout={2500} 
		  		transitionEnterTimeout={500} 
		  		transitionLeaveTimeout={600}>
		      { React.cloneElement(this.props.children || <div /> ,{ key: this.props.location.pathname }) }
		    </ReactCSSTransitionGroup>
		)
	}
}

PageLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default PageLayout
