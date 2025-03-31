import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../../ui/DeleteItem";
import UpdateItem from "../../ui/UpdateItem";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const onClickHandler = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice,
    };

    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 rounded-md ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p
          className={`font-bold ${soldOut ? "text-stone-400" : "text-yellow-500"}`}
        >
          {name}
        </p>
        <p className="text-xs capitalize italic">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-400">
              Sold out
            </p>
          )}

          {currentQuantity > 0 ? (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItem id={id} isMenu={true} />
              <DeleteItem id={id} />
            </div>
          ) : (
            <Button type="small" disabled={soldOut} onClick={onClickHandler}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
