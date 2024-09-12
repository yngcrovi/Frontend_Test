import { useState } from 'react';
import styles from './App.module.css'
import getCookie from '../../Cookie/getCookie'
import makeRequest from '../../makeRequest/makeRequest';
import { getProductURL, getParamProductURL, homeURL } from '../../URL/URL';
import CardProduct from '../Card/CardProduct/CardProduct';
import CardAddProduct from '../Card/CardAddProduct/CardAddProduct';
import FilterMenu from '../FilterMenu/FilterMenu';

export default function App() {

  const [arrProduct, setArrProduct] = useState([])
  const [arrAddProduct, setArrAddProduct] = useState([])
  const [readMoreStatus, setReadMoreStatus] = useState([])
  const [paramForFilter, setParamForFilter] = useState({})

  const getCurrentProduct = async () => {
    let response = await makeRequest(getProductURL, 'GET')
    let arrReadMore = []
    response = await response.json()
    response = response['all_product']
    if (Array.isArray(response[0])){
      setArrProduct(response)
      for (let i = 0; i < response.length; i++) {
        arrReadMore[i] = false
      }
      setReadMoreStatus(arrReadMore)
    }else{
      setArrProduct([response])
      for (let i = 0; i < response.length; i++) {
        arrReadMore[i] = false
      }
      setReadMoreStatus(arrReadMore)
    }
  }

  const getParamForFilter = async () => {
    let response = await makeRequest(getParamProductURL, 'GET')
    response = await response.json()
    setParamForFilter(response)
  }

  window.addEventListener('load', () => {
    getCurrentProduct()
    getParamForFilter()
  });

  const addProduct = () => {
    setArrAddProduct([...arrAddProduct, 
      ['Название продукта', 'Тип продукта', 'Калории', 'Белки', 'Жиры', 'Углеводы', 'Цена']
    ])
  }
  
  const logout = () => {
    document.cookie = 'auth=; Max-Age=-1;';
    window.location.href = homeURL;
  }

  return (
    <>
      {
        getCookie('auth') 
        ?
        <>
        <div>
          <button className={styles.buttonLogout} onClick={logout}>Выйти</button>
        </div>
         <FilterMenu 
          setArrProduct={setArrProduct} getCurrentProduct={getCurrentProduct} paramForFilter={paramForFilter}
         />
        <CardProduct 
          arrProduct={arrProduct} getCurrentProduct={getCurrentProduct} arrAddProduct={arrAddProduct} 
          setArrAddProduct={setArrAddProduct} setArrProduct={setArrProduct} readMoreStatus={readMoreStatus}
          setReadMoreStatus={setReadMoreStatus} getParamForFilter={getParamForFilter}
        />
        <CardAddProduct 
          arrAddProduct={arrAddProduct} getCurrentProduct={getCurrentProduct} setArrAddProduct={setArrAddProduct}
          getParamForFilter={getParamForFilter}
        />
        <button className={styles.buttonAddNewProduct} onClick={addProduct}>+</button>
        </>
        :
        <>
        <div className={styles.body}>
        <a href='/registration'><button className={styles.buttonRegistration}>Зарегестрироваться</button></a>
        <a href='/login'><button className={styles.buttonLogin}>Войти</button></a>
        </div>
        </>
      }
    </>
)
}