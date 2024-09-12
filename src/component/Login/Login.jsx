import styles from './Login.module.css'
import makeRequest from '../../makeRequest/makeRequest'
import { loginURL, homeURL } from '../../URL/URL'
export default function Login() {

    const sendRegistration = async () => {
        let username = document.querySelector(`.${styles.username}`).value
        let password = document.querySelector(`.${styles.password}`).value
        let body = {
            'username': username,
            'password': password
        }
        let response = await makeRequest(loginURL, 'POST', body)
        if (response.status === 401){
            alert('Неверный логин или пароль!')
        }else{
            response = await response.json()
            document.cookie = 'auth=true'
            window.location.href = homeURL;
        }
    }

  return (
    <>
        <div className={styles.body}>
            <p className={styles.name}>Войти</p>
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
            <button className={styles.buttonRegistration} onClick={sendRegistration}>Войти</button>
        </div>
    </>
)
}