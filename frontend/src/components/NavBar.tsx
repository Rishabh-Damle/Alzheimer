import { Link } from "react-router-dom";
import { Signup } from "../pages.tsx/Signup";
import { Logo } from "./icons/Logo";
import { Button } from "./ui/Button";

export const NavBar = () => {
  return (
    <div className="flex flex-wrap justify-between sm:justify-between p-10">
      <div className="flex">
        <div className="pr-2 text-4xl font-semibold text-purple-600 text-shadow-sm mt-2">
          <Logo></Logo>
        </div>
        <div className=" text-purple-600 text-shadow-sm text-4xl font-semibold mt-1">
          Alzheimer
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="text-neutral-100 text-2xl border-2 border-purple-600 text-center rounded-lg mt-4 sm:mt-0 mr-4 py-1 px-2 bg-purple-600">
          <Link to="/signup"> Signup</Link>
        </div>
        <div className=" text-purple-600 text-2xl text-center rounded-lg  border-2 border-purple-600 py-1 px-2 bg-neutral-100 mt-4 sm:mt-0">
          <Link to="/signin"> Signin</Link>
        </div>
      </div>
    </div>
  );
};
