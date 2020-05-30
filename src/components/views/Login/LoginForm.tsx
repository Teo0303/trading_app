import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { SignIn } from "../../../styles/generalStyles";

import { withFirebase } from "../../../services/fb";

const INITIAL_STATE = {
  username: "",
  password: "",
  error: null
};

const LoginFormBase = (props: any) => {
  const [{ username, password, error }, setForm] = useState<any>(INITIAL_STATE);
  let history = useHistory();

  const onFinish = (values: any) => {
    const { username, password } = values;

    console.log(props.firebase);

    props.firebase
      .doSignInWithEmailAndPassword({ username, password })
      .then(() => {
        setForm(INITIAL_STATE);
        history.push("/");
      })
      .catch((errorInfo: any) => {
        setForm(INITIAL_STATE);
        console.log("eeeeee");
        message.error(errorInfo.message);
      });
  };

  const onFinishFailed = (errorInfo: any) => {};

  const onChange = (event: any) => {
    setForm({ [event.target.name]: event.target.value });
  };

  const onClose = () => {
    setForm({ error: null });
  };

  return (
    <SignIn>
      <h1>ADMIN DASHBOARD</h1>

      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            value={username}
            size='large'
            defaultValue={username}
            onChange={onChange}
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            value={password}
            defaultValue={password}
            onChange={onChange}
            size='large'
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            size='large'
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </SignIn>
  );
};

const LoginForm = withFirebase(LoginFormBase);

export default LoginForm;
