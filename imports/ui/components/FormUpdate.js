import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },

  mapPropsToFields(props) {
    return {
      title: Form.createFormField({
        ...props.title,
        value: props.title.value,
      }),
      content: Form.createFormField({
        ...props.content,
        value: props.content.value,
      }),
      description: Form.createFormField({
        ...props.description,
        value: props.description.value,
      }),
    };
  },

  onValuesChange(_, values) {
    console.log(values);
  }

})((props) => {
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

  // Only show error after a field is touched.
  const titleError = isFieldTouched('title') && getFieldError('title');
  const descriptionError = isFieldTouched('description') && getFieldError('description');
  const contentError = isFieldTouched('content') && getFieldError('content');

  return (

    <Form className="login-form" onSubmit={this.handleSubmit}>
      <FormItem
        validateStatus={titleError ? 'error' : ''}
        help={titleError || ''}
        label="Titre du cours"
      >
        {getFieldDecorator('title', {
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
          <TextArea rows={8} placeholder='Mettez le contenu de votre cours Ici'/>
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
});

export class FormUpdate extends Component {
  state = {
    fields: {
      title: {
        value: 'benjycui',
      },
      description: {
        value: 'benjycui',
      },
      content: {
        value: 'benjycui',
      },
    },
  };
  handleFormChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields },
    });
  }
  render() {
    const fields = this.state.fields;
    return (
      <div>
        <CustomizedForm {...fields} onChange={this.handleFormChange} />
      </div>
    );
  }
}
