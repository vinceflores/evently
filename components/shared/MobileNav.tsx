import { SignedIn } from "@clerk/nextjs";
import NavItems from "./NavItems";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MenuIcon from "@/public/assets/icons/menu.svg";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
export default function MobileNav() {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src={MenuIcon}
            width={24}
            height={24}
            alt="menuu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="bg-white flex flex-col gap-6 md:hidden">
          <Image
            src={"/assets/images/logo.svg"}
            alt="logo"
            width={128}
            height={38}
          />
          <Separator className="border border-gray-500" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
