// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

export default class AppContainer extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
