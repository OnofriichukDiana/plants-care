"use client";
import "./styles.css";
import Navigation from "./Navigation";
import Logo from "../Logo";
import UserInfo from "./UserInfo";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isShowHeader = pathname !== "/signin" && pathname !== "/signup";
  return (
    <>
      {isShowHeader && (
        <header className="header-container z-50">
          <div className="flex justify-between items-center">
            <Logo />
            <Navigation />
            <UserInfo />
          </div>
        </header>
      )}
    </>
  );
};
export default Header;
