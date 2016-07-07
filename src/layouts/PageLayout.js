import React,{ Component, PropTypes } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTransitionGroup from 'react-addons-transition-group'
import Toast from '../components/Toast'

// const FirstChild = React.createClass({
//   render: function() {
//     var children = React.Children.toArray(this.props.children);
//     return children[0] || null;
//   }
// })

class PageLayout extends Component{
	render(){
		const {cls, toastShow, toastDesc } = this.props
		const clsName = classnames({
			'pageLayout' : true,
			'cls'       : !!cls
		})

		return(
			<div className= { clsName }>
				<ReactTransitionGroup component='div' >
			  	{/*<ReactCSSTransitionGroup 
			  		className= { clsName }
			  		component='div' 
			  		transitionName={transitionName} 
			  		transitionAppear={true} 
			  		transitionAppearTimeout={1500} 
			  		transitionEnterTimeout={500} 
			  		transitionLeaveTimeout={600}>
			      { React.cloneElement(this.props.children || <div /> ,{ key: this.props.location.pathname }) }
			    </ReactCSSTransitionGroup>*/}
			    { React.cloneElement(this.props.children || <div /> ,{ key: this.props.location.pathname }) }
			  </ReactTransitionGroup>
			  {toastShow && <Toast description={toastDesc} show={toastShow}/> }
		  </div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		toastDesc:state.msg.get('toastDesc'),
		toastShow:state.msg.get('toastShow')
	}
}

PageLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

PageLayout = connect( mapStateToProps )(PageLayout)
export default PageLayout
