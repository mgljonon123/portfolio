import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className="ml-5 text-sm font-bold tracking-wide text-zinc-500 max-md:ml-2.5"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 h-[60px]"
        aria-label={label}
      />
      <div className="flex shrink-0 self-stretch mt-3.5 bg-black h-[5px] w-full max-md:max-w-full" />
    </>
  );
};

export default FormInput;
