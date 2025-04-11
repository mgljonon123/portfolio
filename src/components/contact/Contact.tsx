// components/Contact.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import FormInput from "./FormInput";
import MessageInput from "./MessageInput";
import SubmitBtn from "./Submit";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const label = "ENTER YOUR NAME*";
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="flex overflow-hidden flex-col items-center px-20 pt-48 pb-16 bg-white max-md:px-5 max-md:pt-24">
      <div className="flex flex-col max-w-full w-[743px]">
        <h1 className="self-center text-3xl font-bold leading-none text-center text-black tracking-[10.66px] animate-fadeIn">
          CONTACT
        </h1>
        <p className="mt-24 text-base leading-5 text-center text-black max-md:mt-10 max-md:max-w-full animate-fadeIn animate-delay-100">
          Nulla in velit a metus rhoncus tempus. Nulla congue nulla vel sem
          varius finibus. Sed ornare sit amet lorem sed viverra. In vel urna
          quis libero viverra facilisis ut ac est.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start px-16 mt-44 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
        >
          <div className="w-full animate-slideUp animate-delay-200">
            <FormInput
              label="ENTER YOUR NAME*"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full mt-8 animate-slideUp animate-delay-300">
            <FormInput
              label="ENTER YOUR EMAIL*"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full mt-8 animate-slideUp animate-delay-400">
            <FormInput
              label="PHONE NUMBER"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mt-16 max-w-full w-[406px] max-md:mt-10 animate-slideUp animate-delay-500">
            <div className="flex gap-5 max-md:flex-col">
              <div className="w-3/5 max-md:ml-0 max-md:w-full">
                <MessageInput
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>
            <SubmitBtn></SubmitBtn>
          </div>
        </form>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        .animate-delay-100 {
          animation-delay: 0.1s;
        }
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
        .animate-delay-300 {
          animation-delay: 0.3s;
        }
        .animate-delay-400 {
          animation-delay: 0.4s;
        }
        .animate-delay-500 {
          animation-delay: 0.5s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Input focus animation (assumes FormInput/MessageInput have an input/textarea) */
        input:focus,
        textarea:focus {
          border-color: #000000;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default Contact;
