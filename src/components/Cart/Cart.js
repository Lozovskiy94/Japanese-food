import Modal from '../UI/Modal'
import styles from './Cart.module.css'
import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-contex'
import CartItem from './CartItem'
import SubmitOrder from './SubmitOrder'

const Cart = (props) => {

    const [isSubmitOrderAvailable, setIsSubmitOrderAvailable] = useState(false)
    const [isDataSubmitting, setIsDataSubmitting] = useState(false)
    const [wasDataSendingSuccuessful, setWasDataSendingSuccessful] = useState(false)

    const cartContext = useContext(CartContext)

    const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`

    const hasItems = cartContext.items.length > 0

    const removeCartItemHandler = (id) => {
        cartContext.removeItem(id)
    }

    const addCartItemHandler = (item) => {
        cartContext.addItem({ ...item, amount: 1 })
    }

    const orderHandler = () => {
        setIsSubmitOrderAvailable(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsDataSubmitting(true)

        await fetch('https://project-743c3-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedMeals: cartContext.items
            })
        })
        setIsDataSubmitting(false)
        setWasDataSendingSuccessful(true)
        cartContext.clearCart()
    }

    const cardItems = <ul className={styles['cart-items']}>{cartContext.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onAdd={addCartItemHandler.bind(null, item)} onRemove={removeCartItemHandler.bind(null, item.id)} />)}</ul>

    const modalButtons = (
    <div className={styles.actions}>
        <button onClick={props.onHideCart} className={styles['button-alt']}>Закрыть</button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Заказать</button>}
    </div>
    )

    const cartModalContent = (
        <React.Fragment>
            {cardItems}
            <div className={styles.total}>
                <span>Итого</span>
                <span>{totalAmount}</span>
            </div>
            {isSubmitOrderAvailable && <SubmitOrder onSubmit={submitOrderHandler} onHideCart={props.onHideCart}/>}
            {!isSubmitOrderAvailable && modalButtons}
        </React.Fragment>
    )

    const dataSubmittingCartModalContent = <p>Отправка данных заказа...</p>

    const dataWasSubmittedCartModalContent = <React.Fragment><p>Ваш заказ успешно отправлен!</p>    <div className={styles.actions}>
    <button onClick={props.onHideCart} className={styles['button-alt']}>Закрыть</button>
</div></React.Fragment>

    return <Modal onHideCart={props.onHideCart}>
        {!isDataSubmitting && !wasDataSendingSuccuessful && cartModalContent}
        {isDataSubmitting && dataSubmittingCartModalContent}
        {wasDataSendingSuccuessful && dataWasSubmittedCartModalContent}
    </Modal>
}

export default Cart