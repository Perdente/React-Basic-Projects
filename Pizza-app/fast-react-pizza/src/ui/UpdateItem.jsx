import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "../features/cart/cartSlice";

const UpdateItem = ({ id, isMenu = false }) => {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(id))}>
        -
      </Button>
      {isMenu && <span>{currentQuantity}</span>}
      <Button type="round" onClick={() => dispatch(increaseItemQuantity(id))}>
        +
      </Button>
    </div>
  );
};

export default UpdateItem;
