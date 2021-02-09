import React, { useEffect, useState } from 'react';
import { Card, Icon, Button, Divider, Dropdown } from 'semantic-ui-react';
import ModalQuestion from '../modalQuestion/ModalQuestion';

import './Styles.scss';

const CardProduct = ({ productData, currentUser, removeFunction, updateFunction, loader, quantityOptions = 0, inShoppingCart = false, selected = false, soldOut = false, addToShoppingCart }) => {

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

  console.log("orderItem =>>", orderItem)

  const handleAddToCart = () => addToShoppingCart(productData.id, quantity)

  const handleDelete = () => {
    openDelete && setOpenDelete(false);
    const sendId = inShoppingCart ? orderItem.id : thisProduct.id;
    removeFunction(sendId);
  }

  const handleUpdate = (e, {value}) => {
    const productId = thisProduct.id
    updateFunction(value, productId);
  }

  useEffect(() => {
    setNotShopper(seller.email !== currentUser.email);
  }, [notShopper, currentUser, seller])

  const chooseQuantity = (e, {value}) => { setQuantity(value) };

    return (
      <Card className="cardItem">
        <img src={`${thisProduct.image_url}`} alt={thisProduct.title} className="cardItem__image" />
        <Card.Content>
          <Card.Header>{thisProduct.title}</Card.Header>
          <Card.Description>
            Price: ${inShoppingCart ? orderItem.unit_price : thisProduct.price}
          </Card.Description>
          <Card.Description>
            Qty: {thisProduct.quantity}
          </Card.Description>
          {
          inShoppingCart &&
          <>
            <Divider/>
            <Card.Description>
              Total for this order: ${orderItem.total_price}
            </Card.Description>
          </>
          }
        </Card.Content>
        <Card.Content extra>
          <Icon name='user' />
          {seller.first_name} {seller.last_name}
        </Card.Content>  
        { 
          notShopper && 
          <Card.Content extra>
            <div>
              <Dropdown 
                name="quantity"
                disabled={isAvailable}
                compact
                selection 
                placeholder={inShoppingCart ? "Update qty" : "Qty"}
                options={quantityOptions} 
                onChange={inShoppingCart ? updateFunction : chooseQuantity}
              />
              {
              !inShoppingCart ?
              <Button floated='right' color="blue" disabled={isAvailable} icon onClick={handleAddToCart}>
                {buttonOptions}
              </Button> :
              <ModalQuestion deleteAction={true} cartAction={true} performAction={handleDelete} openModal={openDelete} setOpenModal={setOpenDelete} loader={loader}/>
              }
            </div>
          </Card.Content>
          }
          {
            <Card.Content textAlign='center' extra>
              {
              currentUser && !notShopper &&
              <>
                <ModalQuestion deleteAction={true} performAction={handleDelete} openModal={openDelete} setOpenModal={setOpenDelete} loader={loader} />
                <ModalQuestion performAction={handleUpdate} openModal={openUpdate} setOpenModal={setOpenUpdate} loader={loader} />
              </> 
              }
            </Card.Content>
          }
      </Card>
  )
}

export default CardProduct;