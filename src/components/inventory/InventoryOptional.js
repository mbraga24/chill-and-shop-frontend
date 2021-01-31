import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Button, Divider, Form } from 'semantic-ui-react'
import { UPDATE_ORDER } from '../../store/type';
import CardProduct from '../cardProduct/CardProduct';
import ProductForm from '../productForm/ProductForm'

import './Styles.scss';

const Inventory = ({ handleBanner }) => {

  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);
  const [ files, setFiles ] = useState(null)
  const [ sellerProducts, setSellerProducts] = useState([])
  const [ productFormList, setProductFormList ] = useState([])

  // ======================================================
  // PROBLEM:
  //   FOR SOME REASON I CANNOT ACCESS productFormList ARRAY 
  //   IN handleDeleteComponent FUNCTION. AN INSTANCE OF THE FUNCTION
  //   IS CREATED AND PASSED ON AS A PROPS TO <ProductForm/> 

  // HYPOTHESIS:
  //   1. I BELIEVE IT HAS SOMETHING TO DO WITH WHEN REACT 
  //     SAVES THE ARRAY OF COMPONENTS TO THE STATE. 
  //     THERE MUST BE A KNOWLEDGE GAP IN MY UNDERSTANDING 
  //     OF HOW STATE IS BEING UPDATED IN THE FOR LOOP AND NOT 
  //      ALLOWING ME TO SEE THE productFormList ARRAY. 
      // NOTE: ONCE I SELECT SEVERAL FILES FOR UPLOAD THE ARRAY REMAINS EMPTY.
      // WHEN I ADD AN EXTRA FILE FOR UPLOAD THE ARRAY APPEARS WITH THE LAST 2 ELEMENTS

  
  // RULED OUT HYPOTHESIS:
  //   1. WHEN <ProductForm/> COMPONENT IS CREATED AND UPDATED EACH TIME IN THE FOR LOOP  
  //     BASED ON THE NUMBER OF FILES SELECTED FOR UPLOAD, AN INSTANCE OF handleDeleteComponent
  //     FUNCTION IS BEING CREATED WITH THE COMPONENT AND THE CURRENT STATE VALUE OF productFormList 
  //     WAS STILL '[]' AN EMPTY ARRAY. HENCE WHY I WASN'T ABLE TO ACCESS THE NEW ARRAY. 
  //     (====> TESTED AND IT WORKED IN DIFFERENT SCENARIOS)

  //   2. prevForm => ([...prevForm, <COMPONENT/>]) SYNTAX IS WRONG 
  //   (====> BUG FIXED)

  //   3. MISSING PROPERTIES ON <input> TAG FOR FILE UPLOADING ? 
  //   (====> NO MISSING PROPERTIES FOUND)
  // ======================================================

  const handleDeleteComponent = (index) => {
    console.log("productFormList DELETE", productFormList)
  }

  const findSellerProducts = useCallback(() => {
    return products.filter(pro => pro.seller.email === currentUser.email)
  }, [products, currentUser])


  const handleImages = (e) => {
    console.log(e.target.files)
    const files = e.target.files
    const currentFormCount = productFormList.length
    for (let i = 0; i < files.length; i++) {
      setProductFormList(prevForm => ([...prevForm, <ProductForm 
        key={files[i].name} 
        deleteForm={() => handleDeleteComponent(i, productFormList)}
        showAction={true}
        handleBanner={handleBanner}
        file={files[i]}
      />]))
    }
  }

  useEffect(() => {
    setSellerProducts(findSellerProducts())
  
  }, [findSellerProducts])


  // const addFormOnClick = e => {
  //   let formNumber = productFormList.length
  //   setProductFormList(

      // productFormList.concat(<ProductForm 
      //   key={files[i].name} 
      //   formNumber={formNumber} 
      //   click={() => handleDeleteComponent(formNumber)}
      //   showAction={true}
      //   handleBanner={handleBanner}
      //   file={files[i]}
      //   />)
  //   )
  // };
  // setProductFormList(prevForm => ([...prevForm, <ProductForm 
  //   key={files[i].name} 
  //   deleteForm={(e) => handleDeleteComponent(i + currentFormCount)}
  //   showAction={true}
  //   handleBanner={handleBanner}
  //   file={files[i]}
  // />]))

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

    console.log("productFormList near RETURN", productFormList)
    
    return (
      <Container className="inventory">
        <h1  className="inventory__title">Inventory</h1>
        <Divider/>
        <div className="inventory__buttonWrapper">
          {/* <Button icon='add' color="blue" onClick={addFormOnClick}> */}
          <Button type="button" htmlFor="files" as="label" icon='add' color="blue">
            Sell a new product
          </Button>
          <input 
            type="file" 
            id="files" 
            name="files[]" 
            multiple
            hidden
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => handleImages(e)}
          />
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