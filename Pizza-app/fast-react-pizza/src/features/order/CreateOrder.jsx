// @ts-ignore
import { Form } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
// @ts-ignore
import { redirect } from "react-router-dom";
// @ts-ignore
import { useNavigation } from "react-router-dom";
// @ts-ignore
import { useActionData } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store/store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
    // @ts-ignore
  } = useSelector((state) => state.user);

  const totalPizzaPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalPizzaPrice * 0.2 : 0;

  const isSubmitting = navigation.state === "submitting";
  const isLoadingAddress = addressStatus === "loading";

  const formErrors = useActionData();

  const cart = useSelector(getCart);
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="form">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="form">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md p-1 text-xs text-red-500">
                {formErrors?.phone}
              </p>
            )}
          </div>
        </div>

        <div className="form relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
              className="input w-full"
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md p-1 text-xs text-red-500">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-2 top-[4.7px] z-10">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
              >
                get location
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 cursor-pointer accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing Order..."
              : `Order Now -> ${formatCurrency(totalPizzaPrice + priorityPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  // @ts-ignore
  if (!isValidPhone(order.phone)) {
    errors.phone = "Not a correct phone no";
  }
  if (Object.keys(errors).length > 0) return errors;

  // if everything is ok, create new order and redirect...
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`); // can't use useNavigate cause it's a function not a component
}

export default CreateOrder;
