import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppinCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { useState, useEffect } from "react";

type ShoppingCartProps ={
    isOpen: boolean
}

export function ShoppingCart( {isOpen}: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart()

        const [storeItems, setStoreItems] = useState<any[]>([]) 

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setStoreItems(data))
    }, [])

    return (<Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>CartItem</Offcanvas.Title></Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                {cartItems.map(item =>(
                <CartItem key={item.id} {...item} />
                ))}
                <div className="ms-auto fw-bold fs-5">
                    Total {formatCurrency(cartItems.reduce((total, 
                    cartItem) => {
                        const item = storeItems.find(i => i.id === cartItem.id)
                        return total + (item?.price || 0) * cartItem.quantity
                    }, 0
                     ))}
                </div>
                </Stack>
            </Offcanvas.Body>
    </Offcanvas>)
}