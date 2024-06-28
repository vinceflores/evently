"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  urlParamName: string;
  page: number | string;
  totalPages: number;
};

const Pagination = ({ urlParamName, page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchPrams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchPrams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="flex gap-2 ">
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-28"
        onClick={() => onClick("previous")}
        disabled={Number(page) <= 1}
      >
        prev
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-28"
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
      >
        next
      </Button>
    </div>
  );
};

export default Pagination;
