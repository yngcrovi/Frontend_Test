import styles from './Registration.module.css'
import makeRequest from '../../makeRequest/makeRequest'
import { registrationURL, homeURL } from '../../URL/URL'


export default function Registration() {

    const sendRegistration = async () => {
        let username = document.querySelector(`.${styles.username}`).value
        let password = document.querySelector(`.${styles.password}`).value
        let body = {
            'username': username,
            'password': password
        }
        let response = await makeRequest(registrationURL, 'POST', body)
        if (response.status === 401){
            alert('Пользователь зарегестрирован!')
        }else{
            response = await response.json()
            document.cookie = 'auth=true'
            window.location.href = homeURL;
        }
    }

  return (
    <>
        <div className={styles.body}>
            <p className={styles.name}>Зарегестрируйтесь</p>
            <div className={styles.registrationField}>
                <input
                    className={styles.username}
                    placeholder='Имя пользователя'
                    type='text'
                />
            </div>
            <div className={styles.registrationField}>
                <input
                    className={styles.password}
                    placeholder='Пароль'
                    type='password'
                />
            </div>
            <button className={styles.buttonRegistration} onClick={sendRegistration}>Отправить</button>
        </div>
    </>
)
}