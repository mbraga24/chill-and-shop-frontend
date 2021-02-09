import React, { useEffect, useState } from 'react';
import { Card, Icon, Button, Divider, Dropdown } from 'semantic-ui-react';
import ModalQuestion from '../modalQuestion/ModalQuestion';

import './Styles.scss';

const CardProduct = ({ productData, currentUser, removeFunction, updateFunction, loader, quantityOptions = 0, soldOut = false, inShoppingCart = false, selected = false, addToShoppingCart }) => {

  let isAvailable = soldOut || selected ? true : false;
  let buttonOptions = soldOut ? "Sold out" : selected ? "Added to cart" : <Icon name='shopping cart' />;
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ openUpdate, setOpenUpdate ] = useState(false);
  const [ notShopper, setNotShopper ] = useState(false);
  const [ quantity, setQuantity ] = useState(1);
  let seller;
  let orderItem;
  let thisProduct;

  if (inShoppingCart) {
    orderItem = productData.orderItem
    thisProduct = productData.product
    seller = thisProduct.seller
  } else {
    seller = productData.seller;
    thisProduct = productData
  }

  const handleAddToCart = () => addToShoppingCart(productData.id, quantity)

  const handleDelete = () => {
    const sendId = inShoppingCart ? orderItem.id : thisProduct.id;
    removeFunction(sendId);
    setTimeout(() => {
      openDelete && setOpenDelete(false);
    }, [2000])
  }

  const handleUpdate = (e, {value}) => {
    const orderItemId = orderItem.id
    updateFunction(value, orderItemId);
  }

  useEffect(() => {
    setNotShopper(seller.email !== currentUser.email);
  }, [notShopper, currentUser, seller])

  const chooseQuantity = (e, {value}) => { setQuantity(value) };

    return (
      <Card className="cardProduct">
        <img src={`${thisProduct.image_url}`} alt={thisProduct.title} className="cardProduct__image" />
        <Card.Content>
          <Card.Header>{thisProduct.title}</Card.Header>
          <Card.Description>
            Price: ${inShoppingCart ? orderItem.unit_price : thisProduct.price}
          </Card.Description>
          <Card.Description>
            Qty: {inShoppingCart ? orderItem.quantity : thisProduct.quantity}
          </Card.Description>
          {
          inShoppingCart &&
          <>
            <Divider/>
            <Card.Description>
              Item total: ${orderItem.total_price}
            </Card.Description>
          </>
          }
        </Card.Content>
        <Card.Content extra>
          <div className="cardProduct__extraContent">
          { 
            notShopper ?
            <>
              <Dropdown 
                name="quantity"
                disabled={isAvailable}
                compact
                selection 
                placeholder={inShoppingCart ? "Update qty" : "Qty"}
                options={quantityOptions} 
                onChange={inShoppingCart ? handleUpdate : chooseQuantity}
                className="cardProduct__quantity"
              />
              {
                !inShoppingCart ?
                <Button floated='right' color="blue" disabled={isAvailable} icon onClick={handleAddToCart}>
                  {buttonOptions}
                </Button> :
                <ModalQuestion deleteAction={true} cartAction={true} performAction={handleDelete} openModal={openDelete} setOpenModal={setOpenDelete} loader={loader}/>
              }
            </>
            : currentUser && !notShopper &&
            <>
              <ModalQuestion deleteAction={true} performAction={handleDelete} openModal={openDelete} setOpenModal={setOpenDelete} loader={loader} />
              <ModalQuestion performAction={handleUpdate} openModal={openUpdate} setOpenModal={setOpenUpdate} loader={loader} />
            </>
          }
          </div> 
        </Card.Content>
        <Card.Content extra>
            <Icon name='user' />
            {seller.first_name} {seller.last_name}
        </Card.Content>  
      </Card>
  )
}

export default CardProduct;