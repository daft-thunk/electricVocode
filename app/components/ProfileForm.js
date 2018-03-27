import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const FormItem = Form.Item;

class ProfileForm extends Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {

  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="ant-advanced-search-form main-content" onSubmit={this.handleSearch}>
        <Row gutter={24}>
          <Col span={8} key={0} style={{ display: 'block' }}>
            <FormItem label={`GitHub URL`}>
              {getFieldDecorator(`field-${0}`)(
                <Input placeholder="github.com" />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={1} style={{ display: 'block' }}>
            <FormItem label={`Stack Overflow URL`}>
              {getFieldDecorator(`field-${1}`)(
                <Input placeholder="stackoverflow.com" />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={2} style={{ display: 'block' }}>
            <FormItem label={`Waffle Board URL`}>
              {getFieldDecorator(`field-${2}`)(
                <Input placeholder="waffle.io" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
        <div className="save-btn">
          <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">Save</Button>
          </Col>
          </div>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedProfileForm = Form.create()(ProfileForm);

export default withRouter(connect()(WrappedAdvancedProfileForm));
