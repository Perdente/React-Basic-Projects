import React from "react";
import { useSelector } from "react-redux";

const Username = () => {
  // @ts-ignore
  const username = useSelector((state) => state.user.username);

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
};

export default Username;
