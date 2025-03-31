import React from "react";
import Header from "./Header";
import Main from "./Main";
// @ts-ignore
import { useNavigation } from "react-router-dom";
import Loader from "./Loader";
// @ts-ignore
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <Main />
    </div>
  );
};

export default AppLayout;
