import styles from './SubmitOrder.module.css'
import { useRef, useState } from 'react'

const isInputValid = (inputValue) => {
    return inputValue.trim() !== ''
}

const SubmitOrder = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        city: true,
        address: true
    })

    const nameInputRef = useRef()
    const cityInputRef = useRef()
    const addressInputRef = useRef()

    const confimOrderHandler = (event) => {
        event.preventDefault()
        const enteredName = nameInputRef.current.value
        const enteredCity = cityInputRef.current.value
        const enteredAddress = addressInputRef.current.value

        const isEnteredNameValid = isInputValid(enteredName)
        const isEnteredCityValid = isInputValid(enteredCity)
        const isEnteredAddressValid = isInputValid(enteredAddress)

        setFormValidity({
            name: isEnteredNameValid,
            city: isEnteredCityValid,
            address: isEnteredAddressValid
        })

        const isFormValid = isEnteredAddressValid && isEnteredNameValid && isEnteredCityValid

        if (!isFormValid) {
            return
        }

        props.onSubmit({
            name: enteredName,
            city: enteredCity,
            address: enteredAddress
        })

    }

    const nameInputClasses = `${styles.control} ${formValidity.name ? '' : styles.invalid}`
    const cityInputClasses = `${styles.control} ${formValidity.city ? '' : styles.invalid}`
    const addressInputClasses = `${styles.control} ${formValidity.address ? '' : styles.invalid}`

    return <form className={styles.form} onSubmit={confimOrderHandler}>
        <div className={nameInputClasses}>
            <label htmlFor='name'>Имя</label>
            <input type='text' id='name' ref={nameInputRef}/>
            {!formValidity.name && <p>Введите имя</p>}
        </div>
        <div className={cityInputClasses}>
            <label htmlFor='city'>Город</label>
            <input type='text' id='city' ref={cityInputRef}/>
            {!formValidity.city && <p>Введите город</p>}
        </div>
        <div className={addressInputClasses}>
            <label htmlFor='adress'>Адрес</label>
            <input type='text' id='adress' ref={addressInputRef}/>
            {!formValidity.address && <p>Введите адрес</p>}
        </div>
        <div className={styles.actions}>
            <button className={styles.submit}>Подтвердить Заказ</button>
            <button type='button' onClick={props.onHideCart}>Отменить</button>
        </div>
    </form>
}

export default SubmitOrder