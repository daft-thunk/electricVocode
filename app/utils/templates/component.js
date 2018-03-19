const Component = `//npm install react react-redux
import React, { Component } from 'react'
import {connect} from 'react-redux'

/**
 * SMART COMPONENT
 */
class SmartComponent extends Component() {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        Add Content
      </div>
    )
  }
  }

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return { }
}

const mapDispatch = (dispatch, ownProps) => {
  return { }
}

export default connect(mapState)(SmartComponent)
`;

export default Component
