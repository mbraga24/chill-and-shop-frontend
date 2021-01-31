import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Image, Form, Button, Card, Placeholder, Icon } from 'semantic-ui-react'
import useFormFields from '../../hooks/useFormFields';

import { ADD_PRODUCT, SET_BANNER } from '../../store/type';
import { newProduct, updateProduct } from '../../api';
import './Styles.scss';

const ProductForm = ({ deleteForm = null, showAction, product = null, handleBanner, file, formData, handleData }) => {

  // for (let pair of formData.entries()) {
  //   console.log("Key:", pair[0]+ ', ' + "Value:",pair[1]); 
  // }

  console.log("formData", formData)
  
  let disableName;
  const dispatch = useDispatch()
  const [ imageLoader, setImageLoader ] = useState(false)
  const [ placeholder, setPlaceholder ] = useState(null)
  const [ fileName, setFileName ] = useState("")
  const [ fields, handleFieldChange ] = useFormFields({
    title: "",
    price: "",
    quantity: ""
  })

  if (fileName === "") {
    disableName = true;
  } else {
    disableName = false;
  }

  useEffect(() => {
    if (showAction) {
      setPlaceholder("./images/placeholder-product.png")
      setPlaceholder(URL.createObjectURL(file))
    } else {
      // setPlaceholder(product.image_url)
      // setFile(product.image_url)
    }
  }, [imageLoader, product, showAction])
  
  const sendData = () => {
    const productInfo = {
      title: fields.title,
      price: fields.price,
      fileName: file.name
    }
    handleData(productInfo)
  }
  

  useEffect(() => {
    sendData()
  }, [])
  
    return (
    <div className="productForm">
        <Card className="productForm__card">
          <Card.Content>
            <img src={`${placeholder}`} className="productForm__picture" />
          </Card.Content>
        </Card>
        <div className="productForm__form">
          <Form.Field>
            <Form.Input
            name="title"
            fluid
            label="Product title"
            placeholder="Leather Shoes"
            onChange={handleFieldChange}
            />
          <Form.Group widths='equal'>
            <Form.Input 
            name="price"
            fluid 
            label='Price' 
            placeholder="$39.99" 
            onChange={handleFieldChange}
            />
            {/* <Form.Input 
            name="quantity"
            fluid 
            label="Quantity" 
            placeholder='2' 
            onChange={handleFieldChange}
            defaultValue={showAction ? "" : fields.quantity}
            />*/}
          </Form.Group>
            {/* <Button type="submit" color="blue" loading={imageLoader}>
              <Icon name={`${showAction ? "add" : "edit" }`} /> 
              {showAction ? "Add product" : "Update"}
            </Button>     */}
              {
                showAction && 
                <Button type="button" color="red" onClick={deleteForm}>
                  <Icon name='cancel' /> Cancel
                </Button>    
              }
          </Form.Field>
        </div>
    </div>
  )
}

export default ProductForm;
