"use client";

import {
  Navbar as FlowbiteNavbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const searchParams = useSearchParams();
  const walletId = searchParams.get("walletId");
  return (
    <FlowbiteNavbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <Image
          className="mr-3"
          alt="Full Cycle Invest"
          src="/logo.png"
          width={30}
          height={30}
        />
        <span className="text-xl">FullCycle Invest</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <div className="content-center">Olá {walletId?.substring(0, 5)}...</div>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <Link href={`/?walletId=${walletId}`} passHref legacyBehavior>
          <NavbarLink className="text-xl">Carteira</NavbarLink>
        </Link>
        <Link href={`/assets/?walletId=${walletId}`} passHref legacyBehavior>
          <NavbarLink className="text-xl">Ativos</NavbarLink>
        </Link>
        <Link href={`/orders?walletId=${walletId}`} passHref legacyBehavior>
          <NavbarLink href="#" className="text-xl">
            Ordens
          </NavbarLink>
        </Link>
      </NavbarCollapse>
    </FlowbiteNavbar>
  );
}
