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

		// Only take the first-level part of the path as key, instead of the whole path.
		const { pathname } = this.props.location
		const key = pathname.split('/')[1] || 'root'

		return(
				<ReactTransitionGroup 
				component='div' 
				className= { clsName }>
			    { React.cloneElement(this.props.children || <div /> ,{ key: key }) }
			  {toastShow && <Toast description={toastDesc} show={toastShow}/> }
			  </ReactTransitionGroup> 
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
