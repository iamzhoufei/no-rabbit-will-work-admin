import { useMount } from 'ahooks';
import { Modal, Form, Input, Button, Radio } from 'antd';
import { TwitterPicker } from 'react-color';

import type { ITagModalProps } from '../../interfaces';

const TagModalComponent = (props: ITagModalProps) => {
  const [form] = Form.useForm();
  const { visible, tag, onOk, onCancel } = props;

  useMount(() => {
    form.setFieldsValue({
      label: tag?.label ?? '',
      id: tag ? tag?.value : '',
    });
  });

  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log({
      ...values,
      color: values?.color?.hex,
    });
    onOk({
      ...values,
      color: values?.color?.hex,
    });
  };

  return visible ? (
    <div className="tag-modal-wrapper">
      <Modal
        title={tag ? '修改标签' : '创建新的标签'}
        visible={visible}
        closable={false}
        destroyOnClose={true}
        footer={false}
      >
        <Form
          layout="horizontal"
          form={form}
          initialValues={{
            status: 1,
          }}
        >
          {tag ? (
            <Form.Item label="标签id" name="id">
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
            <TwitterPicker triangle="hide" />
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
        <div>
          <Button type="default" style={{ marginRight: 10 }} onClick={onCancel}>
            取消
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            确定
          </Button>
        </div>
      </Modal>
    </div>
  ) : null;
};

export default TagModalComponent;
