import React from "react";
import { Button, Card } from "react-bootstrap";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {

  const { addItemToCart } = useCart();

  return (
    <Card
      bg="info"
      key="Info"
      text="Info"
      style={{ width: "18rem"}}
      className="mb-2"
    >
      <Card.Img variant="top" src={product.images[0]}/>
      <Card.Header>Producto # {product.id}</Card.Header>
      <Card.Body>
        <Card.Title> {product.title} - $ {product.price}</Card.Title>
        <Card.Text>
          {product.description}
        </Card.Text>
        <Card.Footer>
            <Button 
                variant="primary"
                onClick={() => addItemToCart(product)}
             >
                Agregar a carrito
            </Button>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
