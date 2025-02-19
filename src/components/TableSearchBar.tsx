'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';


const SearchBar = () => {

  const router = useRouter();

  // Apply new hook useActionState
  const searchAction = async (previousState: unknown, formData: FormData) => {
    const value = formData.get('search') as string;
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };

  const [, action,] = useActionState(searchAction, undefined);

  /*
  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    // e.currentTarget[0] is the input element,coz <Image> is from nextjs, not jsx element
    // const value = (e.currentTarget[0] as HTMLInputElement).value;
    // More secure way to get value, by using name attribute
    const value = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };
*/

  return (
    // Search Bar ，ring doesn't have height weight, border has
    <form
      action={action}
      className="flex items-center w-full md:max-w-max space-x-2 
    text-xs rounded-full ring-[1.5px] ring-gray-300 "
    >
      <Image src="/images/search.png" alt="Search" width={14} height={14} />
      <input
        name='search'
        className="bg-transparent focus:outline-none w-52"
        type="text"
        placeholder="Search..."
      />
    </form>
  );
};

export default SearchBar;
