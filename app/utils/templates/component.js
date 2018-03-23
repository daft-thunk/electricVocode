import { pascalCaseWords } from '../wordMethods';

const Component = input => {
  input = input.length ? pascalCaseWords(input) : 'SmartComponent';
  return `//npm install react react-redux
import React, { Component } from 'react'
import {connect} from 'react-redux'

/**
 * SMART COMPONENT
 */
class ${input} extends Component {
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

export default connect(mapState, mapDispatch)(${input})
`;
};

export default Component;
