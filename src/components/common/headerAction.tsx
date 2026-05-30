import React from "react";
import AuthButton from "./authButton";
import CartButton from "../cart/CartButton";
import SearchBtn from "../search/SearchBtn";

const HeaderAction = () => {
  return (
    <div className="flex items-center gap-4">
      <SearchBtn />

      <div className="hidden lg:flex">
        <AuthButton anchor="top-right" />
      </div>

      <CartButton />
    </div>
  );
};

export default HeaderAction;
