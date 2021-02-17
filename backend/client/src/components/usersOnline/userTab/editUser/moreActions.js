import requests from '../../../../requests/requests';
import { useContext, useState } from "react";
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import { SocketContext } from "../../../main";
import ChangePassword from "./changePassword/changePassword";

const MoreActions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const socket = useContext(SocketContext);

  const logout = async () => {
    socket.close();
    const response = await requests.logout();
    //if (response) {
      window.location.href = (requests.path + '/login') 
    //} 
  };

  const handleDeleteOk = async () => {
    setConfirmLoading(true);
    const response = await requests.deleteUser();
    setConfirmLoading(false);
    if (response) {
      logout();
      return
    }
  };

  const showModalDelete = () => {
    setIsModalDeleteVisible(true)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsModalDeleteVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        More Actions
      </Button>
      <Modal title="More Actions" visible={isModalVisible} footer={null} onCancel={handleCancel} >
        <Button type="text" onClick={logout}>
          Log Out
        </Button>
        <ChangePassword />
        <Button type="text" danger onClick={showModalDelete}>
          Delete Account
        </Button>
        <Modal confirmLoading={confirmLoading} title="Delete Account" visible={isModalDeleteVisible} onOk={handleDeleteOk} onCancel={handleDeleteCancel} >
          <p className="red-text" >This action cannot be undone. <br /> Are you sure to continue?</p>
        </Modal>
      </Modal>
    </>
  );
};

export default MoreActions;

