import { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import RegistrationForm from './antSignup';
import requests from "../../requests/requests";

const NormalLoginForm = (props) => {
  const [displaySignup, setDisplaySignup] = useState(false);

  const onFinish = async (values) => {
    const loggedin = await requests.login(values)
    console.log('loggedin ', loggedin);
    if (loggedin) {
      props.initSession()
    } else return 0;
  };

  function handleSuccessSignup(bool) {
    if (bool) return setDisplaySignup(false)
    return 0
  }

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
        </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
        </Button>
        Or <a onClick={() => setDisplaySignup(true)} >register now!</a>
        </Form.Item>
      </Form>
      {displaySignup && <RegistrationForm handleSuccessSignup={handleSuccessSignup} />}
    </>
  );
};

export default NormalLoginForm;
