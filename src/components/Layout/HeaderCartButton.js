import styles from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-contex'

const HeaderCartButton = (props) => {

    const [isButtonAnimated, setIsButtonAnimated] = useState(false)

    const cartContext = useContext(CartContext)

    const cartItemsNumber = cartContext.items.reduce((curValue, item)=>{
        return curValue + item.amount
    }, 0)

    const  buttonClasses = `${styles.button} ${isButtonAnimated ? styles.bump : ''}`

    useEffect(() => {
        if(cartContext.items.length === 0) {
            return
        }
        setIsButtonAnimated(true)

        const timer = setTimeout(()=>{
            setIsButtonAnimated(false)
        }, 300)
        return () => {
            clearTimeout(timer)
        }
    }, [cartContext.items])

    return <button className={buttonClasses} onClick={props.onClick}>
        <span className={styles.icon}>
            <CartIcon/>
        </span>
        <span>Корзина</span>
        <span className={styles.badge}>{cartItemsNumber}</span>
    </button>
}

export default HeaderCartButton