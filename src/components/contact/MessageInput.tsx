import React from "react";

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex grow gap-4 items-start w-[500px] text-sm font-bold tracking-wide text-zinc-500 max-md:mt-10">
      <div className="object-contain shrink-0 aspect-[0.03] w-[5px] mt-5 bg-black" />
      <div className="flex flex-col w-[590px]">
        <label htmlFor="message" className="self-start mb-2">
          YOUR MESSAGE*
        </label>
        <textarea
          id="message"
          name="message"
          value={value}
          onChange={onChange}
          required
          className="h-40 w-full p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Your message"
        />
        {/* SVG under the textarea */}
        <div className="relative top-[-7px] left-[-20px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="609"
            height="5"
            fill="none"
            viewBox="0 0 609 5"
          >
            <path fill="#000" d="M0 5V0h609v5z" />
          </svg>
        </div>
        <div className="shrink-0 self-end mt-2 h-[45px] w-[3px] max-md:mt-10" />
      </div>
    </div>
  );
};

export default MessageInput;
