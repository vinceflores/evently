"use client"
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";
import { useEffect } from "react";

type DropdownProps = {
  value?: string;
  onChangeHandler: () => void;
};

function Dropdown({ value, onChangeHandler }: DropdownProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCateogry] = useState<string>("");
  const handleAddcategory = () => {
    createCategory({
      categoryName: newCategory.trim(),
    }).then((category) => {
      setCategories((prev) => [...prev, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();
  }, []);

  return (
    <>
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field ">
          <SelectValue placeholder="category" />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0 &&
            categories.map((category) => (
              <SelectItem
                key={category._id}
                value={category._id}
                className="select-item key-regular-14"
              >
                {category.name}
              </SelectItem>
            ))}

          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8  text-primary-500 hover:bg-primary-50 focus:text-primary-500 ">
              Add Category
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Category name"
                    className="input-field mt-3"
                    onChange={(e) => setNewCateogry(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => startTransition(handleAddcategory)}
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    </>
  );
}

export default Dropdown;