import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo/Untitled-1.png";
import { AuthContext } from "../../../context/AuthContext";
import useColorTheme from "../../../hooks/useColorTheme";

const Navbar = () => {
  const [colorTheme, setTheme] = useColorTheme();
  const { dispatch, user } = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="px-5 flex justify-between  sticky top-0 z-40 border-b dark:border-gray-700 bg-slate-50/60 backdrop-blur-2xl transition-colors duration-500 dark:bg-[#0B1120]/80 dark:text-white">
      <nav className="flex justify-between w-full md:px-5 px-2 items-center   ">
        <div>
          <Link to="/">
            <img className=" object-contain h-16 w-full" src={logo} alt="" />
          </Link>
        </div>
        <div>
          <h1 className="md:text-3xl text-xs font-bold">FILASCO America LLC</h1>
        </div>
        <div
          onClick={() => setTheme(colorTheme)}
          className="w-5 cursor-pointer "
        >
          {colorTheme === "dark" ? darkIcon : lightIcon}
        </div>
      </nav>
      {user ? (
        <div className=" py-4 flex gap-2 items-center">
          <span className="w-[max-content] mr-2">{user.user}</span>
          <button
            className="rounded-md px-4 py-1   text-white bg-sky-500"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className=" py-4 ">
          <Link
            className="rounded-md px-4 py-1   text-white bg-sky-500"
            to="/login"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
const lightIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path>
  </svg>
);

const darkIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"></path>
  </svg>
);
