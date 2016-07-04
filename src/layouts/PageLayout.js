import React,{ Component, PropTypes } from 'react'
import classnames from 'classnames'

class PageLayout extends Component{
	render(){
		const {cls} = this.props
		const clsName = classnames({
			'pageLayout' : true,
			'cls'       : !!cls
		})
		return(
		  <div className={clsName}>
		      {this.props.children}
		  </div>
		)
	}
}

PageLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default PageLayout
