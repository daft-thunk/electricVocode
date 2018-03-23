import { pascalCaseWords } from '../wordMethods';

const statelessComponent = (input) => {
  input = pascalCaseWords(input);
  return `//npm install react react-redux
import React from 'react'
import {connect} from 'react-redux'

/**
 * STATELESS COMPONENT
 */
const ${input} = props => {
  return {
    (
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
`;};

export default statelessComponent;
