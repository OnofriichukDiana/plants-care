"use client";

import React from "react";
import LogoSvg from "../../public/plant";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="relative mx-6">
      <p
        className="subtitle2 absolute top-0 rigth-40"
        style={{ color: "#022510", left: -19 }}
      >
        Grren
      </p>
      <LogoSvg />
      <p
        className="subtitle2 absolute bottom-0 left-10"
        style={{ color: "#2f6a48" }}
      >
        Vibes
      </p>
    </Link>
  );
};

export default Logo;
