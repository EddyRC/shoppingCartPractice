import { faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Badge, Button, Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function CartItem({ productsLen, item, totalProd }) {
  return (
    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">
        {item.title} <Badge bg="danger">{productsLen}</Badge>
        <div className="vr ms-3 me-3" />
        <Button variant="primary" size="sm">
          <FontAwesomeIcon icon={faPlusCircle} size="1x" />{" "}
        </Button>
        <div className="vr ms-3 me-3" />
        <Button variant="danger" size="sm">
          <FontAwesomeIcon icon={faTrashCan} size="1x" />{" "}
        </Button>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#/action-3">
        <h5>Total: ${totalProd}</h5>
      </Dropdown.Item>
    </Dropdown.Menu>
  );
}

export default CartItem;
