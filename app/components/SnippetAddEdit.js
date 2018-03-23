import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { postNewSnippet } from '../store/snippets';

const FormItem = Form.Item;

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.name,
        value: props.name.value
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
    <Form layout="inline" className="responsive-container">
      <FormItem label="Snippet Name">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Snippet name is required!' }]
        })(<Input />)}
      </FormItem>
      <FormItem label="Voice Command">
        {getFieldDecorator('command', {
          rules: [{ required: true, message: 'Command is required!' }]
        })(<Input />)}
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
  state = {
    fields: {
      name: {
        value: ''
      },
      command: {
        value: ''
      }
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    // validation here

    // This vvv doesn't get called!
    console.log('clicked');
    //      ^^^

    // console.log('text:', this.props.text);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        postNewSnippet({
          userId: 1,
          command: this.state.fields.command.value,
          code: this.props.text
        });
      }
    });
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
      <div>
        <CustomizedForm
          {...fields}
          onChange={this.handleFormChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = state => ({

});

const mapDispatch = (dispatch, ownProps) => {
  return {
  };
};


export default withRouter(connect(mapState)(SnippetAddEdit));

