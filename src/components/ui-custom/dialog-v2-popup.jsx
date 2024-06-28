"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { buttonVariants } from "@/components/ui/button";

import { CircleX } from "lucide-react";
import { Resizable } from "re-resizable";
import Draggable from "react-draggable";

export function ModalPopup({ title = "", children, setDialogState }) {
  const router = useRouter();
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeDialog = () => {
    dialogRef.current?.close();
    setDialogState(false);
    // onClose();
    // dialogStateCallBack();
  };

  const closeModal = (e) => e.target === dialogRef.current && router.back();

  return (
    <div
      ref={dialogRef}
      // onClick={closeModal}
      // onClose={router.back}
      className=" text-3xl rounded-lg overflow-clip resize"
    >
      <div className="flex flex-row justify-between   pt-2 px-2 bg-slate-200 ">
        <h1 className="text-2xl">{title}</h1>
        <CircleX
          onClick={closeDialog}
          className="mb-2 py-1 px-1 cursor-pointer rounded border-none w-10 h-10 font-bold  "
        />
        {/* <button
              onClick={closeDialog}
              className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
            >
              x
            </button> */}
      </div>
      <div className="p-4   ">{children}</div>
      {/* <Link href="/catch-all" className={buttonVariants({ variant: "link" })}>
              Back
            </Link> */}
    </div>
  );
}
