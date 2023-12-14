"use client";

import React from "react";
import LogoSvg from "../../public/plant";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex">
      <p className="h1">P</p>
      <LogoSvg />
      <p className="h1">C</p>
    </Link>
  );
};

export default Logo;
