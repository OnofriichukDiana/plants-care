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
        <div
          className="header-container z-50 "
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          }}
        >
          <div className="flex justify-between items-center">
            <Logo />
            <Navigation />
            <UserInfo />
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
