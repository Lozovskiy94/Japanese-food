import CartContext from "./cart-contex"
import { useReducer } from "react"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

        const existingCartItemIndex = state.items.findIndex(item => {
           return item.id === action.item.id
        })

        const exestingCartItem = state.items[existingCartItemIndex]

        let updatedItems
        let updetedItem

        if (exestingCartItem) {
            updetedItem = {
                ...exestingCartItem,
                amount: exestingCartItem.amount + action.item.amount
            }

            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updetedItem
        } else {
            updetedItem = {
                ...action.item
            }
            updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'REMOVE_ITEM') {


        const existingCartItemIndex = state.items.findIndex((item) => {
            console.log(item)
            return item.id === action.id
         })

         const exestingCartItem = state.items[existingCartItemIndex]

         const updatedTotalAmount = state.totalAmount - exestingCartItem.price

         let updatedItems
         if(exestingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id)
         } else {
            const updetedItem = {...exestingCartItem, amount:exestingCartItem.amount - 1}
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updetedItem
         }
         return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
         }

    }

    if (action.type === 'CLEAR_CART') {
        return defaultCartState
    }

    return defaultCartState
}

const CartContextProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemHandler = (item) => {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item
        })
    }

    const removeItemHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id: id
        })
    }

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR_CART'})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartContextProvider