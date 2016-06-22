import React,{Component} from 'react'
import Header from '../components/Header'

class CoreLayout extends Component{
	render(){
		return(
		  <div className='container text-center'>
		    <Header/>
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
