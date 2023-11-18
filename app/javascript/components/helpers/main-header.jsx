import React from "react";
import { MainNav } from "./main-nav";
import "@/app/globals.css";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function MainHeader() {
  return (
    <div className="flex flex-1 flex-row justify-between">
      <div className="flex flex-auto flex-row space-x-14 w-4/5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          PokePortal
        </h1>
        <MainNav />
      </div>
      <div className="flex flex-auto justify-end items-center w-1/5 pr-20">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://i.pinimg.com/originals/51/69/ee/5169ee51e0f8b57fe115a822b4188f8d.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
