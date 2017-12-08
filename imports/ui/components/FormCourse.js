import React, { Component } from 'react';

import { Form, Icon, Input, Button } from 'antd';
import 'antd/dist/antd.css';

const { TextArea } = Input;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FormCourse extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const titleNameError = isFieldTouched('titleName') && getFieldError('titleName');
    const descriptionError = isFieldTouched('description') && getFieldError('description');
    const contentError = isFieldTouched('content') && getFieldError('content');
    return (
      <Form className="login-form" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={titleNameError ? 'error' : ''}
          help={titleNameError || ''}
          label="Titre du cours"
        >
          {getFieldDecorator('titleName', {
            rules: [{ required: true, message: 'Inscrivez un titre!' }],
          })(
            <Input placeholder="React & Redux" />
          )}
        </FormItem>

        <FormItem
          validateStatus={descriptionError ? 'error' : ''}
          help={descriptionError || ''}
          label="Description du cours"
        >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Une petite description à remplir ...' }],
          })(
            <Input placeholder="React & Redux" />
          )}
        </FormItem>

        <FormItem
          validateStatus={contentError ? 'error' : ''}
          help={contentError || ''}
          label="contenu du cours"
        >
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Inscrivez un titre!' }],
          })(
            <TextArea rows={4} placeholder='Mettez le contenu de votre cours Ici'/>
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Créer mon cours
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const WrappedFormCourse = Form.create()(FormCourse);
