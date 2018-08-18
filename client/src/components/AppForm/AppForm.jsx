import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input } from 'antd';

const AppForm =({ inputChange, imageChange, textChange, values }) => {
  const FormItem = Form.Item;
  const { TextArea } = Input;

  return (
    <Form>
      <FormItem>
        <Input id="1" onChange={(e) => inputChange(e.target.value)} value={values.name} 
               prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" name="name" 
        />
      </FormItem>
      <FormItem>
        <Input id="2" onChange={(e) => imageChange(e.target.value)}  value={values.image}
               prefix={<Icon type="camera-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Image" name="image"
        />
      </FormItem>
      <FormItem>
        <TextArea onChange={(e) => textChange(e.target.value)} value={values.text}
                  autosize={{ minRows: 2, maxRows: 6 }} placeholder="Description" />
      </FormItem>
    </Form>
  );
}

AppForm.propTypes = {
  inputChange: PropTypes.func.isRequired,
  textChange: PropTypes.func.isRequired,
  imageChange: PropTypes.func.isRequired,
  values: PropTypes.object
};

AppForm.defaultProps = {
  inputChange: () => {},
  textChange: () => {},
  imageChange: () => {},
  values: {}
};

export { AppForm }