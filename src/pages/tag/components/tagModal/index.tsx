import { Modal, Form, Input, Button, Radio } from 'antd';
import { TwitterPicker } from 'react-color';

import type { ITagModalProps } from '../../interfaces';

const TagModalComponent = (props: ITagModalProps) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    props?.onOk({
      ...values,
      color: typeof values?.color === 'string' ? values?.color : values?.color?.hex,
    });
  };

  return (
    <Modal
      title={props?.tag ? '更新标签信息' : '创建新的标签'}
      visible={true}
      closable={false}
      destroyOnClose={true}
      footer={false}
    >
      <Form layout="horizontal" form={form} initialValues={props?.tag}>
        {props?.tag ? (
          <Form.Item label="标签ID" name="id" required>
            <Input disabled={true} />
          </Form.Item>
        ) : null}
        <Form.Item
          label="标签名称"
          name="label"
          rules={[
            {
              required: true,
              message: '标签名称是必填项',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="标签颜色"
          name="color"
          rules={[
            {
              required: true,
              message: '标签颜色是必选项',
            },
          ]}
        >
          <TwitterPicker triangle="hide" color={props?.tag?.color} />
        </Form.Item>

        <Form.Item
          label="标签状态"
          name="status"
          rules={[
            {
              required: true,
              message: '标签状态是必选项',
            },
          ]}
        >
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      <>
        <Button type="default" style={{ marginRight: 10 }} onClick={props?.onCancel}>
          取消
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          确定
        </Button>
      </>
    </Modal>
  );
};

export default TagModalComponent;
