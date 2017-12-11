import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, {Component} from 'react';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      registration: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const labelSubmit = this.props.registration ? 'S\'inscrire' : 'Se connecter';
    const labelChangeView = this.props.registration ? 'Se connecter' : 'S\'inscrire';

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Ton email est obligatoire !' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Ton mot de passe est obligatoire !' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mot de passe" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {labelSubmit}
          </Button>
          Ou <a href="" onClick={this.props.changeView}>{labelChangeView}</a>
        </FormItem>
      </Form>
    );
  }
}

export const FormSign = Form.create()(NormalLoginForm);
