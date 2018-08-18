import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { List, Avatar, Button, Modal } from 'antd';

import { connect } from 'react-redux';
import { getItems, deleteItem, addItem } from '../../store/actions/itemActions';

import { AppForm } from '../index';

import './List.css';

class AppListWrap extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool,

  }
  static defaultProps = {
    getItems: () => {},
    deleteItem: () => {},
    addItem: () => {},
    items: {},
    loading: false
  }

  state = {
    name: '',
    text: '',
    image: ''
  }

  componentDidMount = () => {
    this.props.getItems();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    const { name, text, image } = this.state;
    const item = {
      name,
      description: text ,
      image
    }

    this.props.addItem(item)
    .then(() => {
      this.setState({
        visible: false,
        name: '',
        text: '',
        image: ''
      })
    })
    .catch(err => alert(err.message));
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      name: '',
      text: '',
      image: ''
    });
  }

  deleteItem = id => {
    this.props.deleteItem(id)
  }

  inputChange = name => this.setState({name});

  textChange = text => this.setState({text});

  imageChange = image => this.setState({image})

  render() {
    const { items, loading } = this.props;
    const { visible, name, text } = this.state;
    
    return (
      <div className="List">
        <div className="list__actions">
          <Button type="primary" onClick={this.showModal}>Add Item</Button>
        </div>
        
        <List
          className="list"
          itemLayout="horizontal"
          dataSource={items}
          renderItem={({_id, name, description, image, date}) => (
            <List.Item key={_id}>
              <List.Item.Meta
                avatar={<Avatar src={image} />}
                title={<p>{name}</p>}
                description={description}
              />
              <div>
                <p>{moment(date).startOf('hour').fromNow()}</p>
                <Button type="danger" onClick={() => this.deleteItem(_id)}>Delete</Button>
              </div>
            </List.Item>
          )}
        />

        <Modal
          title="Add Item"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          closable
          confirmLoading={loading}
          okButtonProps={(name.length && text.length) ? { disabled: false } : { disabled: true }}
        >
          <AppForm
            values={this.state}
            inputChange={this.inputChange}
            textChange={this.textChange}
            imageChange={this.imageChange}
          />
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    items: state.item.items,
    loading: state.item.loading
})


const mapDispatchToProps = (dispatch) => ({
    getItems: () => dispatch(getItems()),
    deleteItem: (id) => dispatch(deleteItem(id)),
    addItem: (data) => dispatch(addItem(data))

})


const AppList = connect(mapStateToProps, mapDispatchToProps)(AppListWrap);
export { AppList }