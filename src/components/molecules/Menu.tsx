"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Menu() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-4 text-zinc-400 font-medium">
      <li className={pathname === "/dashboard/sales" ? "text-zinc-900" : ""}>
        <Link href="/dashboard/sales">Vendas</Link>
      </li>
      <li
        className={
          pathname === "/dashboard/product-stock" ? "text-zinc-900" : ""
        }
      >
        <Link href="/dashboard/product-stock">Estoque</Link>
      </li>
    </ul>
  );
}
