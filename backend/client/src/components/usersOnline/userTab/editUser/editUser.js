import {
  Form,
  Input,
  Button,
} from 'antd';
import requests from '../../../../requests/requests';
import MoreActions from './moreActions';
import 'antd/dist/antd.css';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const EditUser = (props) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const response = await requests.editUserInfo(values);
    return response;
  };
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="edit info"
        onFinish={onFinish}
        preserve={false}
        initialValues={{
          username: props.user.username,
          email: props.user.email
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input bordered={false} />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input bordered={false} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
          <MoreActions />
        </Form.Item>

      </Form>
    </>
  );
};

export default EditUser;
