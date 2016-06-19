import React,{Component} from 'react'

class Counter extends Component{
  render(){
    return(
      <div>
        <h2 >
          Counter:
          {' '}
          <span>
            {this.props.counter}
          </span>
        </h2>
        <button onClick={this.props.increment}>
          Increment
        </button>
        {' '}
        <button onClick={this.props.doubleAsync}>
          Double (Async)
        </button>
      </div>
    )
  }
}

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Counter
