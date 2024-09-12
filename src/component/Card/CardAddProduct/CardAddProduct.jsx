import styles from './CardAddProduct.module.css'
import makeRequest from "../../../makeRequest/makeRequest"
import { insertProductURL, updateProductURL } from '../../../URL/URL'

export default function CardAddProduct({arrAddProduct, getCurrentProduct, setArrAddProduct, getParamForFilter}) {

    const saveProduct = async (i) => {
        let helpArr = [...arrAddProduct]
        let product = document.getElementById(`product${i}`).value
        let typeProduct = document.getElementById(`typeProduct${i}`).value
        let calories = document.getElementById(`calories${i}`).value
        let protein = document.getElementById(`protein${i}`).value
        let fat = document.getElementById(`fat${i}`).value
        let carbohydrates = document.getElementById(`carbohydrates${i}`).value
        let price = document.getElementById(`price${i}`).value
        if (
          product && typeProduct && calories && protein && fat && carbohydrates && price
        ){
          let body = {
            'name_product': product,
            'type_product': typeProduct,
            'calories': calories,
            'protein': protein,
            'fat': fat, 
            'carbohydrates': carbohydrates,
            'price': price
          }
          await makeRequest(insertProductURL, 'POST', body)
          delete helpArr[i]
          setArrAddProduct(helpArr)
          getCurrentProduct()
          getParamForFilter()
        }else{
          alert('Заполните все поля!')
        }
      }

      const updateProduct = async (i) => {
        let product = document.getElementById(`product${i}`)
        let typeProduct = document.getElementById(`typeProduct${i}`)
        let calories = document.getElementById(`calories${i}`)
        let protein = document.getElementById(`protein${i}`)
        let fat = document.getElementById(`fat${i}`)
        let carbohydrates = document.getElementById(`carbohydrates${i}`)
        let price = document.getElementById(`price${i}`)
        let body ={}
        product.value ? body['name_product']=product.value : body['name_product']=product.placeholder
        typeProduct.value ? body['type_product']=typeProduct.value : body['type_product']=typeProduct.placeholder
        calories.value ? body['calories']=calories.value : body['calories']=calories.placeholder
        protein.value ? body['protein']=protein.value : body['protein']=protein.placeholder
        fat.value ? body['fat']=fat.value : body['fat']=fat.placeholder
        carbohydrates.value ? body['carbohydrates']=carbohydrates.value : body['carbohydrates']=carbohydrates.placeholder
        price.value ? body['price']=price.value : body['price']=price.placeholder
        body = {
            'new_product': body,
            'old_product': {
                'old_product': arrAddProduct[i]
            }
        }
        await makeRequest(updateProductURL, 'PUT', body)
        let helpArr = [...arrAddProduct]
        delete helpArr[i]
        helpArr = helpArr.filter(Boolean)
        setArrAddProduct(helpArr)
        getCurrentProduct()
      }

      const CancelProduct = (i) => {
        let helpArr = [...arrAddProduct]
        delete helpArr[i]
        helpArr = helpArr.filter(Boolean)
        setArrAddProduct(helpArr)
        getCurrentProduct()
      }

    return(
        <>
        {arrAddProduct.map((el, i) => 
        <div className={styles.product}>
        <div className={styles.lineInputField}>
          <input
            placeholder={el[0]}
            id={`product${i}`}
            type='text'
            className={styles.inputField}
          />
        </div>
        <div className={styles.lineInputField}>
          <input
            placeholder={el[1]}
            id={`typeProduct${i}`}
            type='text'
            className={styles.inputField}
          />
        </div>
        <div className={styles.lineInputField}>
          <input
            placeholder={el[2]}
            id={`calories${i}`}
            type='number'
            className={styles.inputField}
          />
        </div>
        <div className={styles.lineInputField}>
          <input
            placeholder={el[3]}
            id={`protein${i}`}
            type='number'
            className={styles.inputField}
          />
        </div>
        <div className={styles.lineInputField}>
          <input
            placeholder={el[4]}
            id={`fat${i}`}
            type='number'
            className={styles.inputField}
          />
        </div>
        <div className={styles.lineInputField}>
          <input
            placeholder={el[5]}
            id={`carbohydrates${i}`}
            type='number'
            className={styles.inputField}
          />
        </div>
        <div className={styles.lineInputField}>
          <input
            placeholder={el[6]}
            id={`price${i}`}
            type='number'
            className={styles.inputField}
          />
        </div>
        <div className={styles.lineButton}>
            <button onClick={() => {
                if (el[0] === 'Название продукта' ){
                    saveProduct(i)
                }else{
                    updateProduct(i)
                }
            }} className={styles.buttonSave}>Сохранить</button>
            <button onClick={() => {
                CancelProduct(i)
            }
            }className={styles.buttonCancel}>Отмена</button>
        </div>
        </div>
        )}
        </>
    )
}
