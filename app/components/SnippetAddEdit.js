import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { postNewSnippet, changeSnippet } from '../store/snippets';
import { setMode } from '../store/mode';
import { setSnippet } from '../store/currSnippet';
import AddDescription from './AddDescription';

const FormItem = Form.Item;

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      command: Form.createFormField({
        ...props.command,
        value: props.command.value
      })
    };
  },
  onValuesChange(_, values) {
    // console.log(values);
  }
})(props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form
      layout="inline"
      className="responsive-container"
      onSubmit={props.onSubmit}
    >
      <FormItem label="Voice Command">
        {getFieldDecorator('command', {
          rules: [{ required: true, message: 'Command is required!' }]
        })(<Input name="command" />)}
      </FormItem>
      <FormItem>
        <AddDescription text="Save Snippet" handleSubmit={props.handleSubmit} origDescription={props.origDescription} />
      </FormItem>
    </Form>
  );
});

class SnippetAddEdit extends Component {
  constructor() {
    super();

    this.state = {
      fields: {
        command: {
          value: ''
        }
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  componentDidMount() {
    const fields = {
      description: { value: this.props.description },
      command: { value: this.props.origCommand }
    };
    this.setState({ fields });
  }

  handleSubmit = values => {
    // ev.preventDefault();
    // validation here


    const command = this.state.fields.command.value;
    const code = this.props.text;
    const description = values.description;
    let save = true;
    if (command.length < 1) {
      message.error('Voice Command is required');
      save = false;
    }
    if (code.length < 1) {
      message.error('Write Code for a Snippet!');
      save = false;
    }

    // if there was an error, do not save snippet
    if (!save) return;

    if (this.props.mode === 1) {
      this.props.editSnippet(this.props.currId, code, command);
    }
    else if (this.props.mode === 2) {
      const { id } = this.props.user;
      // is this a fork or regular add?
      if (this.props.currId) {
        this.props.forkSnippet({ command, code, description, userId: id }, this.props.currId);
      } else {
        this.props.addSnippet({ command, code, description, userId: id });
      }
    }

  };
  handleFormChange = changedFields => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    });
  };
  render() {
    console.log(this.props.origDescription)
    // console.log('SNIPPET ADD EDIT STATE:', this.state, this.props);
    const fields = this.state.fields;
    return (
      <div className="snippet-form">
        <CustomizedForm
          {...fields}
          onChange={this.handleFormChange}
          handleSubmit={this.handleSubmit}
          origDescription={this.props.origDescription}
        />
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  mode: state.mode,
  text: ownProps.text,
  origCommand: ownProps.command,
  origDescription: ownProps.description,
  currId: state.currSnippet.id,
  history: ownProps.history,
  user: state.user
});

const mapDispatch = (dispatch, ownProps) => {
  return {
    addSnippet(snippet) {
      setTimeout(() => ownProps.history.push('/snippets'), 100);
      dispatch(postNewSnippet(snippet));
      dispatch(setMode('add'));
    },
    editSnippet(snippetId, code, command) {
      setTimeout(() => ownProps.history.push('/snippets'), 100);
      dispatch(changeSnippet(snippetId, code, command));
      dispatch(setMode('add'));
    },
    forkSnippet(snippet, oldSnippetId) {
      setTimeout(() => ownProps.history.push('/snippets'), 100);
      dispatch(postNewSnippet(snippet, oldSnippetId));
      dispatch(setMode('add'));
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(SnippetAddEdit));
