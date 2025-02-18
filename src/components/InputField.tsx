import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TeacherFormValues } from './forms/TeacherForm';
import { StudentFormValues } from './forms/StudentForm';

type InputTypeProps = {
  label: string;
  type?: string;
  placeholder: string;
  register:
  | UseFormRegister<TeacherFormValues>
  | UseFormRegister<StudentFormValues>;
  name: keyof TeacherFormValues | keyof StudentFormValues;
  defaultValue?: string;
  error?:
  | FieldErrors<TeacherFormValues>[keyof TeacherFormValues]
  | FieldErrors<StudentFormValues>[keyof StudentFormValues];
  InputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = 'text',
  placeholder,
  register,
  name,
  defaultValue,
  error,
  InputProps,
}: InputTypeProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-500 ">{label}</label>
      <input
        className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm"
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name)}
        {...InputProps}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
