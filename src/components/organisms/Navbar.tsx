import { LogOut } from "lucide-react";
import Image from "next/image";
import { Menu } from "../molecules/Menu";
import { Button } from "../ui/button";

import logo from "@/assets/svg/logo.svg";

export function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <Image src={logo} alt={"Parintins Show Fogos"} width={200} />

      <Menu />

      <Button variant="outline" size="icon">
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
