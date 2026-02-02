import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/ShoppinCartContext"
import { useState } from "react";


type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string,
    description: string,
    onStorage: number
}


export function StoreItem({
  id, name, price, imgUrl, description, onStorage
}: StoreItemProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  const [showToast, setShowToast] = useState(false);
  const quantity = getItemQuantity(id);
  
  return (
    <>
      <Card className="h-100">
        <Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit: "cover" }} />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-10">
            <span className="">{name}</span>
            <span className="ms-4 text-danger">{formatCurrency(price)}</span>
            <span className="ms-3 text-success">В наличии:  {onStorage || Math.floor(Math.random() * 50) + 10}</span>
          </Card.Title>
          <span className="ms-2 text-success">{description}</span>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button className="w-100" onClick={() => {
                increaseCartQuantity(id);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
              }}>
                + Add to cart
              </Button>
            ) : (
              <div className="d-flex align-items-center justify-content-center" style={{ gap: "1rem" }}>
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div className="d-flex flex-column align-items-center">
                  <span className="fs-3">{quantity}</span>
                  <span className="text-muted">in cart</span>
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>
                  Remove
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: '#198754',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          zIndex: 9999
        }}>
          {name} добавлен в корзину!
        </div>
      )}
    </> 
  );
}

export function StoreItemSkeleton() {
  return (
    <div className="card h-100 placeholder-glow">
      <div className="card-img-top placeholder" style={{ height: "200px" }} />
      <div className="card-body">
        <h5 className="card-title placeholder col-8" />
        <p className="card-text placeholder col-6" />
        <p className="card-text placeholder col-4" />
        <button className="btn btn-primary disabled placeholder col-12" />
      </div>
    </div>
  );
}

