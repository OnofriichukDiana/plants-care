"use client";
import Link from "next/link";
import { menu } from "./menu";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                className={`link h4 mr-3 ${isActive ? "active" : ""}`}
                href={item.path}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Navigation;
