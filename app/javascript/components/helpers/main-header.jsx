import React, { useContext } from "react";
import { MainNav } from "./main-nav";
import "@/app/globals.css";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

/** Created a Header Skeleton to that we can use in every page.  */
export function MainHeader() {
  const { token, logout } = useContext(AuthContext);

  if (token) {
    return (
      <div className="flex flex-1 flex-row justify-between p-6">
        <div className="flex flex-auto flex-row space-x-14 w-4/5">
          <Link
            to="/forum"
            className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
          >
            PokePortal
          </Link>
          <MainNav />
        </div>
        <div className="flex flex-auto justify-end items-center w-1/5 pr-20">
          <Link to="/login">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://i.pinimg.com/originals/09/da/92/09da926c2b94d95008a9e3b2f60bfdd3.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-1 flex-row justify-between p-6">
        <div className="flex flex-auto flex-row space-x-14 w-4/5">
          <Link
            to="/forum"
            className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
          >
            PokePortal
          </Link>
          <MainNav />
        </div>
        <div className="flex flex-auto justify-end items-center w-1/5 pr-20 space-x-10">
          <Link to="/login"> Login </Link>
          <Link to="/signup"> Sign Up </Link>
        </div>
      </div>
    );
  }
}
