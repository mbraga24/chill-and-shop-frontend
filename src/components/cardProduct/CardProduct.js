import React, { useEffect, useState } from 'react';
import { Card, Icon, Button, Dropdown, Divider } from 'semantic-ui-react';
import ModalQuestion from '../modalQuestion/ModalQuestion';

import './Styles.scss';

const CardProduct = ({ thisProduct, currentUser, loader, removeProduct, updateProduct, selected = false, soldOut = false, quantityOptions = 0, addToShoppingCart }) => {

  let isAvailable = soldOut || selected ? true : false;
  let cartButtonOptions = soldOut ? "Sold out" : selected ? "Added to cart" : <Icon name='shopping cart' />;
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ openUpdate, setOpenUpdate ] = useState(false);
  const [ notShopper, setNotShopper ] = useState(false);
  const [ quantity, setQuantity ] = useState(1);
  const { seller } = thisProduct;


  const handleAddToCart = () => addToShoppingCart(thisProduct.id, quantity)

  const handleDelete = () => {
    openDelete && setOpenDelete(false);
    removeProduct(thisProduct.id);
  }

  const handleUpdate = () => {
    console.log("handling update......")
    updateProduct();
  }

  useEffect(() => {
    setNotShopper(seller.email !== currentUser.email);
  }, [notShopper, currentUser, seller])

  const chooseQuantity = (e, {value}) => {setQuantity(value)};

    return (
      <Card className="cardItem">
        <img src={`${thisProduct.image_url}`} alt={thisProduct.title} className="cardItem__image" />
        <Card.Content>
          <Card.Header>{thisProduct.title}</Card.Header>
          <Card.Description>
            Price: ${thisProduct.price}
          </Card.Description>
          <Card.Description>
            Qty: {thisProduct.quantity}
          </Card.Description>
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
                  placeholder='Qty' 
                  options={quantityOptions} 
                  onChange={chooseQuantity}
                />
                <Button floated='right' color="blue" disabled={isAvailable} icon onClick={handleAddToCart}>
                  {cartButtonOptions}
                </Button>
            </div>
          </Card.Content>
          }
          {
            currentUser && !notShopper && 
            <Card.Content textAlign='center' extra>
              <ModalQuestion deleteAction={true} performAction={handleDelete} openModal={openDelete} setOpenModal={setOpenDelete} loader={loader} />
              <ModalQuestion performAction={handleUpdate} openModal={openUpdate} setOpenModal={setOpenUpdate} loader={loader} />
            </Card.Content>
          }
      </Card>
  )
}

export default CardProduct;