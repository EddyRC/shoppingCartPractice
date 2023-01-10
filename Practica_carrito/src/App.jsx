import { Button, Col, Dropdown, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faShoppingCart,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./context/CartContext";
import ProductCard from "./components/ProductCard";
import { useEffect, useState } from "react";
import CartItem from "./components/CartItem";

function App() {
  const [productsLenght, setProductsLenght] = useState(0);
  const { cartItems, products, loadProducts } = useCart();

  useEffect(() => {
    setProductsLenght(
      cartItems.reduce((previous, current) => previous + current.quantity, 0)
    );
  }, [cartItems]);

  const total = cartItems.reduce(
    (previous, current) => previous + current.quantity * current.price,
    0
  );

  useEffect(() => {
    loadProducts();
  }, []);

  function renderProducts() {
    if (products.length === 0) return <h1>No se encontraron productos</h1>;
    return products.map((product) => (
      <Col key={product.id}>
        <ProductCard product={product} />
      </Col>
    ));
  }

  function renderCartItems() {
    return cartItems.map((product) => (
      <CartItem productsLen={productsLenght} totalProd={total} item={product} />
    ));
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Reyso store</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <Form.Control
                type="text"
                placeholder="Busque un producto aqui"
                className="me-2"
                aria-label="Text"
              />
            </Form>

            <div className="vr ms-3 me-3" />

            <Dropdown className="me-5" align="end" autoClose="outside">
              <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                <FontAwesomeIcon icon={faShoppingCart} size="2x" />{" "}
                <Badge bg="danger">{productsLenght}</Badge>
                <span className="visually-hidden">Tus productos</span>
              </Dropdown.Toggle>
              {renderCartItems()}
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-3 mb-4">
        <Row className="justify-content-center">{renderProducts()}</Row>
      </Container>
    </>
  );
}

export default App;
