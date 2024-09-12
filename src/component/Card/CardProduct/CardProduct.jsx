import styles from './CardProduct.module.css'
import makeRequest from '../../../makeRequest/makeRequest'
import { deleteProductURL } from '../../../URL/URL';

export default function CardProduct({
    arrProduct, getCurrentProduct, arrAddProduct, setArrAddProduct, setArrProduct, readMoreStatus, setReadMoreStatus,
    getParamForFilter
}) {

    const delProduct = async (i) => {
        let helpArr = [...arrProduct]
        let body = {
          'name_product': helpArr[i][0]
        }
        await makeRequest(deleteProductURL, 'DELETE', body)
        getCurrentProduct()
        getParamForFilter()
      }

      const changeProductData = async (i) => {
        let helpArr = [...arrProduct]
        setArrAddProduct([...arrAddProduct, helpArr[i]])
        delete helpArr[i]
        helpArr = helpArr.filter(Boolean)
        setArrProduct(helpArr)
        getParamForFilter()
      }

    const showMoreInfo = (i) => {
        let helpBoolen = [...readMoreStatus]
        helpBoolen[i] = !(helpBoolen[i])
        setReadMoreStatus(helpBoolen)
    }

    return (
        <>
        {Array.isArray(arrProduct[0]) && arrProduct[0].length !== 0 &&
        arrProduct.map((el, i) => 
            <>
            <div className={styles.product}>
              <div className={styles.lineInfoProduct}>
                <p>Навзание:</p>
                <p>{el[0]}</p>
              </div>
              {
                readMoreStatus[i] &&
                <>
              <div className={styles.lineInfoProduct}>
                <p>Тип:</p>
                <p>{el[1]}</p>
              </div>
              <div className={styles.lineInfoProduct}>
                <p>Калории:</p>
                <p>{el[2]}</p>
              </div>
              <div className={styles.lineInfoProduct}>
                <p>Белки:</p>
                <p>{el[3]}</p>
              </div>
              <div className={styles.lineInfoProduct}>
                <p>Жиры:</p>
                <p>{el[4]}</p>
              </div>
              <div className={styles.lineInfoProduct}>
                <p>Углеводы:</p>
                <p>{el[5]}</p>
              </div>
              </>
              }
              <div className={styles.lineInfoProduct}>
                <p>Цена:</p>
                <p>{el[6]}</p>
              </div>
                {
                readMoreStatus[i] 
                ? 
                <button onClick={() => {
                    showMoreInfo(i)
                }} className={styles.buttonMore}>Скрыть</button>
                :
                <button onClick={() => {
                    showMoreInfo(i)
                }} className={styles.buttonMore}>Подробнее</button>
                }
                <div className={styles.lineButton}>
                <button onClick={() => {
                    changeProductData(i)
                }} className={styles.buttonChange}>Изменить</button>

                <button onClick={() => {
                    delProduct(i)
                }} className={styles.buttonDel}>Удалить</button>
                </div>
            </div>
            </>
        )}
        </>
    )
}

