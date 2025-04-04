import React from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "../features/cart/cartSlice";

const DeleteItem = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(id))}>
      Delete
    </Button>
  );
};

export default DeleteItem;
