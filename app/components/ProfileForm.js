import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateURLS } from '../store/user';
const FormItem = Form.Item;

class ProfileForm extends Component {
  state = {
    expand: false,
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user, handleSubmit } = this.props;
    return (
      <Form className="ant-advanced-search-form main-content" onSubmit={(e) => handleSubmit(e, user.id)}>
        <Row gutter={24}>
          <Col span={8} key={0} style={{ display: 'block' }}>
            <FormItem label={`GitHub URL`}>
              {getFieldDecorator(`field-${0}`, {
                initialValue: user.githubURL
              })(
                <Input name="github" placeholder={user.githubURL} />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={1} style={{ display: 'block' }}>
            <FormItem label={`Stack Overflow URL`}>
              {getFieldDecorator(`field-${1}`, {
                initialValue: user.stackoverflowURL
              })(
                <Input name="stackoverflow" placeholder={user.stackoverflowURL} />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={2} style={{ display: 'block' }}>
            <FormItem label={`Waffle Board URL`}>
              {getFieldDecorator(`field-${2}`, {
                initialValue: user.waffleURL
              })(
                <Input name="waffle" placeholder={user.waffleURL} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
        <div className="save-btn">
          <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" onClick={info}>Save</Button>
          </Col>
          </div>
        </Row>
      </Form>
    );
  }
}

const mapProps = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, userId) {
      console.log('submit');
      evt.preventDefault();
      const github = evt.target.github.value;
      const stackoverflow = evt.target.stackoverflow.value;
      const waffle = evt.target.waffle.value;

      dispatch(updateURLS(userId, github, stackoverflow, waffle));
    }
  };
};
const info = () => {
  message.info('Changes Saved!');
};
const WrappedAdvancedProfileForm = Form.create()(ProfileForm);

export default withRouter(connect(mapProps, mapDispatch)(WrappedAdvancedProfileForm));
