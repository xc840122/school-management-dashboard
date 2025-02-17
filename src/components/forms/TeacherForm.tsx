'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '../InputField';
import Image from 'next/image';

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be 3 characters long at least!' })
    .max(10, { message: 'Username must be 10 characters long at most!' }),
  email: z.string().email({ message: 'Invalid email address!' }),
  password: z
    .string()
    .min(6, { message: 'Password must be 6 characters long at least!' }),
  firstName: z.string().min(1, { message: 'First name is required!' }),
  lastName: z.string().min(1, { message: 'Last name is required!' }),
  phone: z.string().length(10, { message: 'Phone number is invalid' }),
  address: z.string().min(1, { message: 'Address is required!' }),
  bloodType: z.enum(['A', 'B', 'AB', 'O'], { message: 'Invalid blood type' }),
  birthday: z.union([
    z
      .date()
      .min(new Date(1900, 1, 1), { message: 'Invalid birthday!' })
      .max(new Date(), { message: 'Invalid birthday!' }),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid birthday!' }),
  ]),
  gender: z.enum(['male', 'female'], { message: 'Invalid input' }),
  avatar: z.union([
    z.instanceof(File, { message: 'Invalid file type' }),
    z.string().url({ message: 'Invalid URL' }),
  ]),
});

export type TeacherFormValues = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: 'create' | 'update';
  data?: TeacherFormValues;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8 p-4" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new teacher</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex flex-wrap justify-between gap-8">
        {/* Username */}
        <InputField
          label="Username"
          name="username"
          placeholder="Username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        {/* Email */}
        <InputField
          label="Email"
          name="email"
          placeholder="Email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        {/* Password */}
        <InputField
          label="Password"
          name="password"
          placeholder="Password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
          type="password"
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-8">
        {/* First Name */}
        <InputField
          label="First Name"
          name="firstName"
          placeholder="First Name"
          defaultValue={data?.firstName}
          register={register}
          error={errors?.firstName}
        />
        {/* Last Name */}
        <InputField
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          defaultValue={data?.lastName}
          register={register}
          error={errors?.lastName}
        />
        {/* Phone */}
        <InputField
          label="Phone"
          name="phone"
          placeholder="Phone"
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
        />
        {/* Address */}
        <InputField
          label="Address"
          name="address"
          placeholder="Address"
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
        />
        {/* Blood Type */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500 ">Blood Type</label>
          <select
            className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm"
            {...register('bloodType')}
          >
            <option value="" defaultChecked>
              Select blood type
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
          {errors.bloodType?.message && (
            <p className="text-red-400 text-xs">
              {errors.bloodType.message.toString()}
            </p>
          )}
        </div>
        {/* Birthday */}
        <InputField
          label="Birthday"
          name="birthday"
          placeholder="Birthday"
          register={register}
          error={errors?.birthday}
          type="date"
        />
        {/* Gender */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500 ">Gender</label>
          <select
            className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm"
            {...register('gender')}
          >
            <option value="" defaultChecked>
              Select your gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender?.message && (
            <p className="text-red-400 text-xs">
              {errors.gender.message.toString()}
            </p>
          )}
        </div>
        {/* Upload a avatar image */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label
            className="flex justify-between text-xs text-gray-500 cursor-pointer"
            htmlFor="avatar"
          >
            <Image
              src={'/images/upload.png'}
              alt="Upload"
              width={20}
              height={20}
            />
            <span>Upload a avatar image</span>
          </label>
          <input
            className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm hidden"
            type="file"
            id="avatar"
            {...register('avatar')}
          />
          {errors.avatar?.message && (
            <p className="text-red-400 text-xs">
              {errors.avatar.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2">
        {type === 'create' ? 'Create' : 'Update'}
      </button>
    </form>
  );
};

export default TeacherForm;
