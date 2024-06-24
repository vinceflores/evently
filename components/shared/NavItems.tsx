"use client";
import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
function NavItems() {
  const pathName = usePathname();
  return (
    <ul className="md:flex-between md:flex-row w-full flex flex-col gap-5 items-start ">
      {headerLinks.map((item) => {
        const isActive = pathName === item.route;
        return (
          <li
            key={item.label}
            className={`${isActive && 'text-primary-500'}  p-2   `}
          >
            <Link href={item.route} >{item.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavItems;
