import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Image, Form, Button, Card, Placeholder } from 'semantic-ui-react'
import useFormFields from '../../hooks/useFormFields';

import { ADD_PRODUCT, SET_BANNER } from '../../store/type';
import { newProduct, updateProduct } from '../../api';
import './Styles.scss';

const ProductForm = ({ formNumber, click = null, showAction, product = null, handleBanner }) => {

  let disableName;
  const dispatch = useDispatch()
  const [ imageLoader, setImageLoader ] = useState(false)
  const [ placeholder, setPlaceholder ] = useState(null)
  const [ file, setFile ] = useState(null)
  const [ fileName, setFileName ] = useState("")
  const [ fields, handleFieldChange ] = useFormFields({
    title: showAction ? "" : product.title,
    price: showAction ? "" : product.price,
    quantity: showAction ? "" : product.quantity,
  })

  if (fileName === "") {
    disableName = true;
  } else {
    disableName = false;
  }

  useEffect(() => {
    if (showAction) {
      setPlaceholder("./images/placeholder-product.png")
    } else {
      setPlaceholder(product.image_url)
      setFile(product.image_url)
    }
  }, [imageLoader, product, showAction])

  const fileChange = e => {
    setFile(e.target.files[0]);
    setPlaceholder(URL.createObjectURL(e.target.files[0]))
    setFileName(e.target.files[0].name);
  }

  const onFormSubmit = e => {
    e.preventDefault()
    setImageLoader(true)
    const formData = new FormData();

    formData.append("file", file);
    formData.append("fileName", fileName)
    formData.append("title", fields.title)
    formData.append("price", fields.price)
    formData.append("quantity", parseInt(fields.quantity))
    
    
    if (showAction) {
      newProduct(formData, localStorage.token)
      .then(data => {
        const { product, confirmation } = data
        handleBanner()
        dispatch({ type: ADD_PRODUCT, payload: product })
        dispatch({ type: SET_BANNER, payload: confirmation });
        setImageLoader(false)
      })
    } else {
      updateProduct(product.id, formData, localStorage.token)
      .then(data => {
        // ==========================================
        //        PRODUCT UPDATE INCOMPLETE
        // ==========================================
        console.log(data)
      })
    }

  }

    return (
    <Container className="productForm">
      <div className="productForm__innerContainer">
        <Card>
        {imageLoader ? 
          <Card.Content>
            <Placeholder style={{margin: 5, height: 200, width: 250 }}>
              <Placeholder.Image square />
            </Placeholder>
          </Card.Content> :
          <Card.Content style={{height: "100%"}}>
            <Image 
            as="label"
            htmlFor={`file-${formNumber}`}
            src={`${placeholder}`} 
            size='big' 
            style={{margin: 5, height: 200, width: 250}}
            />
          </Card.Content>
        }
        </Card>
        <div className="productForm__imageFields">
          <Form onSubmit={onFormSubmit}>
            <Form.Field>
              <input
              name="file"
              type="file"
              id={`file-${formNumber}`}
              accept="image/png, image/jpeg, image/jpg"
              hidden
              onChange={fileChange}
              />
              <Form.Input
              fluid
              label="Image"
              placeholder="Image"
              readOnly
              disabled={disableName}
              value={fileName}
              />
              <Form.Input
              name="title"
              fluid
              label="Product title"
              placeholder="Leather Shoes"
              onChange={handleFieldChange}
              defaultValue={showAction ? "" : fields.title}
              />
            <Form.Group widths='equal'>
              <Form.Input 
              name="price"
              fluid 
              label='Price' 
              placeholder="$39.99" 
              onChange={handleFieldChange}
              defaultValue={showAction ? "" : fields.price}
              />
              <Form.Input 
              name="quantity"
              fluid 
              label="Quantity" 
              placeholder='2' 
              onChange={handleFieldChange}
              defaultValue={showAction ? "" : fields.quantity}
              />
            </Form.Group>
              <Button type="submit" color="blue" loading={imageLoader}>
                {showAction ? "Add New Product" : "Update "}
              </Button>    
              {showAction && <Button type="button" color="red" icon='cancel' onClick={click} />}
            </Form.Field>
          </Form>
        </div>
      </div>
    </Container>
  )
}

export default ProductForm;
