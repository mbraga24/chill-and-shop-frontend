import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, Divider, Form } from 'semantic-ui-react'
import { ADD_PRODUCT_FORM, UPDATE_PRODUCT_FORM } from '../../store/type';
import CardProduct from '../cardProduct/CardProduct';
import ProductForm from '../productForm/ProductForm'
// import useFormFields from '../../hooks/useFormFields';
import { newProduct } from '../../api';
import './Styles.scss';

const Inventory = ({ handleBanner }) => {

  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);
  const newProducts = useSelector(state => state.product.newProducts);
  const [ files, setFiles ] = useState(null)
  const [ sellerProducts, setSellerProducts] = useState([])
  const [ productFormList, setProductFormList ] = useState([])
  const [ collectData, setCollectData ] = useState([])
  const dispatch = useDispatch()
  // const [ fields, handleFieldChange ] = useFormFields({
  //   title: "",
  //   price: "",
  //   quantity: ""
  // })
  const handleDeleteComponent = (index) => {
    console.log("productFormList DELETE", productFormList)
  }

  const findSellerProducts = useCallback(() => {
    return products.filter(pro => pro.seller.email === currentUser.email)
  }, [products, currentUser])



  const onFormSubmit = e => {
    e.preventDefault()
    // setImageLoader(true)
    console.log("collectData.length", collectData.length)
    for (let i = 0; i < collectData.length; i++) {
      newProduct(collectData[i])
      // .then(data => {
      //   const { product, confirmation } = data
      //   handleBanner()
      //   dispatch({ type: ADD_PRODUCT, payload: product })
      //   dispatch({ type: SET_BANNER, payload: confirmation });
      //   setImageLoader(false)
      // })
    }
  }

  const handleData = (productInfo) => {
    console.log("PRODUCT INFO", productInfo)

    // console.log("is this true? -->>", !!newProducts.find(data => data.fileSize !== productInfo.fileSize))

    if (!newProducts.find(data => data.fileName == productInfo.fileName)) {
      console.log("PRODUCT CREATED")
      dispatch({ type: ADD_PRODUCT_FORM, payload: productInfo })
    } else {
      console.log("PRODUCT ALREADY EXIST")
    }
    // else if (newProducts.find(data => data.fileName === productInfo.fileName)) {
    //   console.log("PRODUCT UPDATED")
    //   dispatch({ type: UPDATE_PRODUCT_FORM, payload: productInfo })
    // }


    // const files = [...this.state.files]; // Spread syntax creates a shallow copy
    // files.push(...e.target.files); // Spread again to push each selected file individually
    // this.setState({ files });

    // let allData = collectData.map(data => {
    //   if(data.fileName === productInfo.fileName) {
    //     return productInfo
    //   } else {
    //     return data
    //   }
    // })

    // console.log("allData", allData)

    // const data = [...collectData]; // Spread syntax creates a shallow copy
    // data.push(productInfo); // Spread again to push each selected file individually
    // setCollectData([...data, productInfo])
  }


  const handleImages = (e) => {
    console.log(e.target.files)
    const files = e.target.files


    const currentFormCount = productFormList.length
    
    const formData = new FormData();
    
    
    for (let i = 0; i < files.length; i++) {
      formData.append('files[]', files[i])

      setProductFormList(prevForm => ([...prevForm, <ProductForm 
        key={files[i].name} 
        deleteForm={() => handleDeleteComponent(i)}
        showAction={true}
        handleBanner={handleBanner}
        file={files[i]}
        formData={formData}
        handleData={handleData}
      />]))

    }
  }

  useEffect(() => {
    setSellerProducts(findSellerProducts())
  }, [findSellerProducts])

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

    console.log("newProducts:", newProducts)
    
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
        <Form onSubmit={onFormSubmit}>
          {productFormList}
          <Button type="submit" color="blue">
            Submit
          </Button>   
        </Form>
        <Grid>
          <Grid.Row columns={4}>
            {displayInventory()}
          </Grid.Row>
        </Grid>
      </Container>
  )
}

export default Inventory;