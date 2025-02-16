'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import TeacherForm from "./forms/TeacherForm";

const FormModal = <T,>({ table, type, data, id }: {
  table:
  | "teacher"
  | "student"
  | "parent"
  | "subject"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement",
  type: "create" | "update" | "delete",
  data?: T,
  id?: number,
}) => {

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor = type === "create"
    ? "bg-CYellow"
    : (type === "update" ? "bg-CSky" : "bg-CPurple");

  const [open, setOpen] = useState(false);

  // Close modal when press Escape key
  useEffect(() => {
    if (open) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          // console.log(e.key);
          setOpen(false)
        };
      };
      // console.log("AddEventListener");
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        // console.log("removeEventListener");
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open]);


  const Form = () => {
    return (type === "delete") && id
      ? <form action="" className="flex flex-col gap-4 p-4 justify-center items-center">
        <span className="text-center font-medium">All data will be lost. Are you sure to delete this {table}?</span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max">Delete</button>
      </form>
      : <TeacherForm type="create" />
  }

  return (
    <>
      <button
        className={`flex items-center justify-center ${size} rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image
          src={`/images/${type}.png`}
          alt="Type"
          width={16}
          height={16}
        />
      </button>
      {open && (
        <div
          className="flex justify-center items-center w-screen h-screen 
        absolute top-0 left-0 bg-black bg-opacity-60 z-50"
        >
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%]
          lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div className="absolute top-4 right-4 cursor-pointer">
              <Image
                src={"/images/close.png"}
                alt="Close"
                width={14}
                height={14}
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FormModal