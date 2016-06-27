import React,{Component} from 'react'

class CoreLayout extends Component{
	render(){
		return(
		  <div className='container text-center'>
		    <div>
		      {this.props.children}
		    </div>
		  </div>
		)
	}
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
