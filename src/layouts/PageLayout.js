import React,{ Component, PropTypes } from 'react'
import classnames from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class PageLayout extends Component{
	render(){
		const {cls, transitionName='fadeInOut'} = this.props
		const clsName = classnames({
			'pageLayout' : true,
			'cls'       : !!cls
		})
		return(
		  <div className={clsName}>
		  	{<ReactCSSTransitionGroup style={{width:'100%',height:'100%',position:'absolute',left:0,top:0}} component="div" transitionName={transitionName} transitionAppear={true} transitionAppearTimeout={2500} transitionEnterTimeout={500} transitionLeaveTimeout={600}>
		      { React.cloneElement(this.props.children,{ key: this.props.location.pathname }) }
		    </ReactCSSTransitionGroup>}
		    {/*this.props.children*/}
		  </div>
		)
	}
}

PageLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default PageLayout
