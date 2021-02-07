import React from 'react';
import { Modal, Header, Icon, Button } from 'semantic-ui-react';
import ProductUpdateForm from '../productUpdateForm/ProductUpdateForm';

import './Styles.scss';

const ModalQuestion = ({ deleteAction = false, cartAction = false, performAction, openModal = false, setOpenModal, loader }) => {

  console.log("openModal", openModal)
  return (
      <Modal
        closeIcon
        size={deleteAction ? "mini" : "small"}
        dimmer={"inverted"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        trigger={
          <Button inverted color="green" icon>
            { cartAction ? "Remove Order" : <Icon name={deleteAction ? "trash" : "edit"} /> }
          </Button>
        }
      >
        <Header icon={deleteAction ? "trash" : "edit"} content={deleteAction ? "Please confirm" : "Update Product"} />
        <Modal.Content>
          {
            deleteAction ?
              <p>
                {cartAction ? "Are you sure you want to remove this item from your cart?" : "Are you sure you want to delete this product?"}
              </p>
              :
              <ProductUpdateForm/> 
          }
          
        </Modal.Content>
        {   
          <Modal.Actions>
          {
            deleteAction ? 
            <>
              { !loader &&              
                <Button color='red' onClick={() => setOpenModal(false)}>
                  <Icon name='remove' /> No
                </Button>
              }
              <Button color='green' loading={loader} onClick={performAction}>
                <Icon name='checkmark' /> Yes
              </Button>
            </> : 
            <Button color='green' loading={loader} onClick={performAction}>
              <Icon name='edit' /> Update Product
            </Button>
          }
        </Modal.Actions>
          }
      </Modal>
  )
}

export default ModalQuestion;