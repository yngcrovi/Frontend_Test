import styles from './FilterMenu.module.css'
import { useState } from 'react';
import makeRequest from '../../makeRequest/makeRequest'
import { filterURL } from '../../URL/URL';

let arrTypeProduct = []
let operation = {
    'calories': '=',
    'protein': '=',
    'fat': '=',
    'carbohydrates': '=',
    'price': '='
}

export default function FilterMenu({setArrProduct, getCurrentProduct, paramForFilter}) {

    const [boolTypeProduct, setBoolTypeProduct] = useState(false)

    let statusTypeProduct = document.getElementById('box-for-type-product')

    const changeTypeProduct = (i) => {
        let typeProduct = document.querySelector(`.typeProductSelect${i}`).textContent
        let typeProductChecked = document.getElementById(`typeProductCheck${i}`).checked
        if (typeProductChecked){
            arrTypeProduct = [...arrTypeProduct, typeProduct]
        }else{
            let index = arrTypeProduct.indexOf(typeProduct)
            arrTypeProduct.splice(index, 1)
        }
        //После изменения имя продукта здесь сбрасывается массив и наоборот
    }

    const disabledMax = (text) =>{
        if(document.getElementById(text + 'CheckMin').checked){
            document.getElementById(text + 'CheckMax').disabled = true
            operation[text] = '<'
        }else{
            document.getElementById(text + 'CheckMax').disabled = false
            operation[text] = '='
        }
    }

    const disabledMin = (text) =>{
        if(document.getElementById(text + 'CheckMax').checked){
            document.getElementById(text + 'CheckMin').disabled = true
            operation[text] = '>'
        }else{
            document.getElementById(text + 'CheckMin').disabled = false
            operation[text] = '='
        }
    }

    const showFilter = async () => {
        let calories = document.getElementById('caloriesInput')
        let protein = document.getElementById('proteinInput')
        let fat = document.getElementById('fatInput')
        let carbohydrates = document.getElementById('carbohydratesInput')
        let price = document.getElementById('priceInput')
        let body = {
            'operation': operation,
            'type_product': arrTypeProduct,

        }
        if(calories.value){
            body['calories'] = calories.value
        }
        if(protein.value){
            body['protein'] = protein.value
        }
        if(fat.value){
            body['fat'] = fat.value
        }
        if(carbohydrates.value){
            body['carbohydrates'] = carbohydrates.value
        }
        if(price.value){
            body['price'] = price.value
        }
        let response = await makeRequest(filterURL, 'POST', body)
        response = await response.json()
        if (Array.isArray(response[0])){
            setArrProduct(response)
        }else{
            if (response.length){
                setArrProduct([response])
            }else{
                setArrProduct([])
            }
        }
    }

    const clearFilter = () => {
        document.getElementById('caloriesInput').value = ''
        document.getElementById('proteinInput').value = ''
        document.getElementById('fatInput').value = ''
        document.getElementById('carbohydratesInput').value = ''
        document.getElementById('priceInput').value = ''
        getCurrentProduct()
        setBoolTypeProduct(false)
        statusTypeProduct.checked = false

    }


    return(
        <>
        <div className={styles.body}>
            <div className={styles.lineTypeProduct}>
                <input className={styles.checkBox} type='checkbox' id='box-for-type-product' onClick={() => {
                    setBoolTypeProduct(statusTypeProduct.checked)
                }}/>
                <p>Тип продукта</p>
            </div>
            {
                boolTypeProduct &&
                paramForFilter['type_product'].map((el, i) => 
                    <>
                    <div className={styles.lineSelectTypeProduct}>
                        <input className={styles.checkBox} type='checkbox' id={`typeProductCheck${i}`} onClick={() => {
                            changeTypeProduct(i)
                        }}/>
                        <p className={`typeProductSelect${i}`}>{el}</p>
                    </div>
                    </>
                )
            }
            <div className={styles.lineInput}>
                <input 
                    className={styles.fieldCalories}
                    placeholder='Калории'
                    type='number'
                    id={'caloriesInput'}
                />
                <input className={styles.checkBox} type='checkbox' id={'caloriesCheckMin'} 
                onClick={() => {
                    disabledMax('calories')
                }}/>
                <p>&lt;</p>
                <input className={styles.checkBox} type='checkbox' id={'caloriesCheckMax'} 
                onClick={() => {
                    disabledMin('calories')
                }}/>
                <p>&gt;</p>
            </div>
            <div className={styles.lineInput}>
                <input 
                    className={styles.fieldProtein}
                    placeholder='Белки'
                    type='number'
                    id={'proteinInput'}
                />
                <input className={styles.checkBox} type='checkbox' id={'proteinCheckMin'} 
                onClick={() => {
                    disabledMax('protein')
                }}/>
                <p>&lt;</p>
                <input className={styles.checkBox} type='checkbox' id={'proteinCheckMax'} 
                onClick={() => {
                    disabledMin('protein')
                }}/>
                <p>&gt;</p>
            </div>
            <div className={styles.lineInput}>
                <input 
                    className={styles.fieldFat}
                    placeholder='Жиры'
                    type='number'
                    id={'fatInput'}
                />
                <input className={styles.checkBox} type='checkbox' id={'fatCheckMin'} 
                onClick={() => {
                    disabledMax('fat')
                }}/>
                <p>&lt;</p>
                <input className={styles.checkBox} type='checkbox' id={'fatCheckMax'} 
                onClick={() => {
                    disabledMin('fat')
                }}/>
                <p>&gt;</p>
            </div>
            <div className={styles.lineInput}>
                <input 
                    className={styles.fieldCarbohydrates}
                    placeholder='Углеводы'
                    type='number'
                    id={'carbohydratesInput'}
                />
                <input className={styles.checkBox} type='checkbox' id={'carbohydratesCheckMin'} 
                onClick={() => {
                    disabledMax('carbohydrates')
                }}/>
                <p>&lt;</p>
                <input className={styles.checkBox} type='checkbox' id={'carbohydratesCheckMax'} 
                onClick={() => {
                    disabledMin('carbohydrates')
                }}/>
                <p>&gt;</p>
            </div>
            <div className={styles.lineInput}>
                <input 
                    className={styles.fieldPrice}
                    placeholder='Цена'
                    type='number'
                    id={'priceInput'}
                />
                <input className={styles.checkBox} type='checkbox' id={'priceCheckMin'} 
                onClick={() => {
                    disabledMax('price')
                }}/>
                <p>&lt;</p>
                <input className={styles.checkBox} type='checkbox' id={'priceCheckMax'} 
                onClick={() => {
                    disabledMin('price')
                }}/>
                <p>&gt;</p>
            </div>
            <button className={styles.buttonShowFilter} onClick={showFilter}>Показать</button>
            <button className={styles.buttonClearFilter} onClick={clearFilter}>Очистить</button>
        </div>

        </>
    )
}