import { useRef, useState } from 'react'
import styles from './MealItemForm.module.css'
import Input from '../../UI/Input'

const MealItemForm = (props) => {

    const [isAmountValid, setIsAmountValid] = useState(true)

    const amountInputRef = useRef()

    const submitHandler = (event) => {
        event.preventDefault()

        const inputAmount = amountInputRef.current.value
        if(inputAmount.trim().length === 0 || +inputAmount < 1 || +inputAmount > 10){
            setIsAmountValid(false)
            return
        }

        props.onAddToCart(+inputAmount)
    } 

    return <form className={styles.form} onSubmit={submitHandler}>
        <Input 
            ref={amountInputRef}
            label='Количество' 
            input={{
            id: props.id,
            min: '1',
            step: '1',
            type: 'number',
            defaultValue: '1'
        }} />
        <button>Добавить</button>
        {!isAmountValid && <p>Пожалуйста введите количество от 1 до 10</p>}
    </form>
}

export default MealItemForm