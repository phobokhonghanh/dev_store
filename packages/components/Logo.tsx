import { cn } from "@origini/libs/utils";
import Link from "next/link";
import Image from "next/image";

import LOGO from "./logo.svg";

interface LogoProps {
  className?: string;
  logoClassName?: string;
  width?: number;
  height?: number;
}

export default function Logo({
  className = "",
  logoClassName = "",
  width = 50,
  height = 50,
}: LogoProps) {
  const logoCls = cn(
    "flex items-center",
    "p-1 sm:p-2 md:p-3",
    "hover:opacity-80 transition-opacity",
    "cursor-pointer",
    "rounded-full",
    "w-15 sm:w-20 md:w-30 h-auto",
    logoClassName,
  );

  return (
    <Link
      href="/"
      className={cn("font-bold flex flex-row items-center", className)}
    >
      <Image
        src={LOGO}
        alt="Logo"
        width={width}
        height={height}
        className={logoCls}
      />
    </Link>
  );
}
