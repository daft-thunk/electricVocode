import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { postNewSnippet, changeSnippet } from '../store/snippets';
import { setMode } from '../store/mode';
import { setSnippet } from '../store/currSnippet';

const FormItem = Form.Item;

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      description: Form.createFormField({
        ...props.description,
        value: props.description.value
      }),
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
      <FormItem label="Snippet Description">
        {getFieldDecorator('description', {
          rules: [{ required: true, message: 'Snippet description is required!' }]
        })(<Input name="description" />)}
      </FormItem>
      <FormItem label="Voice Command">
        {getFieldDecorator('command', {
          rules: [{ required: true, message: 'Command is required!' }]
        })(<Input name="command" />)}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Save Snippet
        </Button>
      </FormItem>
    </Form>
  );
});

class SnippetAddEdit extends Component {
  constructor() {
    super();

    this.state = {
      fields: {
        description: {
          value: ''
        },
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
      description: { value: this.props.origCommand },
      command: { value: this.props.origCommand }
    };
    console.log(fields);
    this.setState({ fields });
    console.log(this.state);
  }

  handleSubmit = e => {
    e.preventDefault();
    // validation here

    console.log('clicked', this.state.fields.description.value);

    const command = e.target.command.value;
    const description = e.target.description.value;
    const code = this.props.text;
    let save = true;
    if (command.length < 1) {
      message.error('Voice Command is required');
      save = false;
    }
    if (description.length < 1) {
      message.error('description is required');
      save = false;
    }
    if (code.length < 1) {
      message.error('Write Code for a Snippet!');
      save = false;
    }

    // if there was an error, do not save snippet
    if (!save) return;

    // this.props.addSnippet()
    // console.log('Command---', command);
    // console.log('Code----', code);
    if (this.props.mode === 1) {
      this.props.editSnippet(this.props.currId, code, command);
    }
    else if (this.props.mode === 2) {
      const { id } = this.props.user;
      // is this a fork or regular add?
      if (this.props.currId) {
        this.props.forkSnippet({ command, code, userId: id }, this.props.currId);
      } else {
        this.props.addSnippet({ command, code, userId: id });
      }
    }

  };
  handleFormChange = changedFields => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    });
  };
  render() {
    // console.log('SNIPPET ADD EDIT STATE:', this.state, this.props);
    const fields = this.state.fields;
    return (
      <div className="snippet-form">
        <CustomizedForm
          {...fields}
          onChange={this.handleFormChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  mode: state.mode,
  text: ownProps.text,
  origCommand: ownProps.command,
  currId: state.currSnippet.id,
  history: ownProps.history,
  user: state.user
});

const mapDispatch = (dispatch, ownProps) => {
  return {
    addSnippet(snippet) {
      setTimeout(() => ownProps.history.push('/snippets'), 100);
      dispatch(postNewSnippet(snippet));
      dispatch(setMode('sandbox'))
    },
    editSnippet(snippetId, code, command) {
      setTimeout(() => ownProps.history.push('/snippets'), 100);
      dispatch(changeSnippet(snippetId, code, command));
      dispatch(setMode('sandbox'))
    },
    forkSnippet(snippet, oldSnippetId) {
      setTimeout(() => ownProps.history.push('/snippets'), 100);
      dispatch(postNewSnippet(snippet, oldSnippetId));
      dispatch(setMode('sandbox'));
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(SnippetAddEdit));
