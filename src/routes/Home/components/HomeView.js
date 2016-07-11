import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { processAnimation } from '../../../common/util'

class HomeView extends Component{
	componentWillAppear(callback){
		const el = this.refs.homeview
		processAnimation(el, 'fadeInOut-appear', 'fadeInOut-appear-active', 1500, callback)
	}
	componentWillEnter(callback){
		const el = this.refs.homeview
		processAnimation(el, 'right-enter', 'right-enter-active', 500, callback)
	}
	componentWillLeave(callback){
		const el = this.refs.homeview
		processAnimation(el, 'right-leave', 'right-leave-active', 600, callback)
	}
	render(){
		return(
			<div ref='homeview'>
		    <h4>welcome</h4>
		    <Link to='/create'>上传</Link>
		  </div>
		)
	}
}

export default HomeView
