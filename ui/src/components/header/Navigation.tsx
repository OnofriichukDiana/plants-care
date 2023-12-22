"use client";
import Link from "next/link";
import { menu } from "./menu";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <menu>
      {menu.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            className={`link h4 mr-3 ${isActive ? "active" : ""}`}
            id={item.path}
            href={item.path}
          >
            {item.title}
          </Link>
        );
      })}
    </menu>
  );
};
export default Navigation;
