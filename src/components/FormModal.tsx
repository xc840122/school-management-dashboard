'use client'
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import { TeacherFormValues } from "./forms/TeacherForm";
import { StudentFormValues } from "./forms/StudentForm";
import dynamic from "next/dynamic";

// for client component, optimize the loading of the form components
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <p>Loading...</p>
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <p>Loading...</p>
});

// define the forms object，return the form component based on the table(key) and type(value)
const forms: {
  [key: string]: (type: "create" | "update", data?: TeacherFormValues | StudentFormValues) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data as TeacherFormValues} />,
  student: (type, data) => <StudentForm type={type} data={data as StudentFormValues} />
}

const FormModal = ({ table, type, data, id }: {
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
  data?: TeacherFormValues | StudentFormValues,
  id?: number,
}) => {

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor = type === "create" ? "bg-CYellow" : (type === "update" ? "bg-CSky" : "bg-CPurple");
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
    switch (type) {
      case "delete":
        return id ? (
          <form action="" className="flex flex-col gap-4 p-4 justify-center items-center">
            <span className="text-center font-medium">All data will be lost. Are you sure to delete this {table}?</span>
            <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max">Delete</button>
          </form>) : null;
      case "update":
        return id ? forms[table](type, data) : null;
      case "create":
        return forms[table](type, data);
      default: return null;
    }
  };

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

export default FormModal;