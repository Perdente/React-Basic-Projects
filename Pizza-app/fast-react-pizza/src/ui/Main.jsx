import React from "react";
import CartOverview from "../features/cart/CartOverview";
// @ts-ignore
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </>
  );
};

export default Main;
