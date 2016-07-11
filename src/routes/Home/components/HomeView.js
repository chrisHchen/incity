import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { processAnimation } from '../../../common/util'
import Movable from '../../../components/Movable'

// export const HomeView = () => (
//   <div>
//     <h4>Welcome!</h4>
//     <Link to='/create'>上传</Link>
//     <Movable style={{width:'50px',height:'50px',backgroundColor:'green'}}>movable</Movable>
//   </div>
// )

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
		    <div style={{height:'1000px'}}>
		    	<Movable 
		    		component='div' 
		    		style={{width:'50px',height:'50px',backgroundColor:'green',display:'block',left:'100px',top:'200px'}}
		    		shouldReverse={true}
		    		destination={[
		    			{
		    				x:100,
		    				y:100
		    			}
		    		]}>
		    		<div>haha</div>
		    	</Movable>
		    </div>
		    <div id='test' style={{position:'absolute',left:'100px',top:'100px',width:'1px', height:'1px', backgroundColor:'red'}}>
		    </div>
		  </div>
		)
	}
}

export default HomeView
