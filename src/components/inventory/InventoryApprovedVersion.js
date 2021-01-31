import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Button, Divider, Form } from 'semantic-ui-react'
import CardProduct from '../cardProduct/CardProduct';
import ProductForm from '../productForm/ProductForm'

import './Styles.scss';

const Inventory = ({ handleBanner }) => {

  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);
  const [ sellerProducts, setSellerProducts] = useState([])
  const [ productFormList, setProductFormList ] = useState([])

  const handleDeleteComponent = async (index) => {
    const filtered = productFormList.filter(form => form.key !== index);
    setProductFormList(filtered)
  }

  const findSellerProducts = useCallback(() => {
    return products.filter(pro => pro.seller.email === currentUser.email)
  }, [products, currentUser])

  useEffect(() => {
    setSellerProducts(findSellerProducts())
  }, [findSellerProducts])


  const addFormOnClick = e => {
    let index = productFormList.length
    setProductFormList(
      productFormList.concat(<ProductForm 
        key={index} 
        formIndex={index} 
        deleteForm={() => handleDeleteComponent(index)}
        showAction={true}
        handleBanner={handleBanner}
      />)
    )
  };
  
  const displayInventory = () => {
    return sellerProducts.map(thisProduct => (
      <CardProduct 
        key={`${thisProduct.title}-${thisProduct.id}`} 
        thisProduct={thisProduct} 
        currentUser={currentUser} 
        handleBanner={handleBanner}
      />
    ))
  }

  console.log("productFormList inventory", productFormList)

    return (
      <Container className="inventory">
        <h1  className="inventory__title">Inventory</h1>
        <Divider/>
        <div className="inventory__buttonWrapper">
          <Button icon='add' color="blue" onClick={addFormOnClick}>
            Sell a new product
          </Button>
        </div>
          {productFormList}
        <Grid>
          <Grid.Row columns={4}>
            {displayInventory()}
          </Grid.Row>
        </Grid>
      </Container>
  )
}

export default Inventory;