const statelessComponent = `//npm install react react-redux
import React from 'react'
import {connect} from 'react-redux'

/**
 * STATELESS COMPONENT
 */
const StatelessComponent = props => {
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

export default connect(mapState, mapDispatch)(StatelessComponent)
`;

export default statelessComponent
