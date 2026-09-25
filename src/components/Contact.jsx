import ContactForm from "./ContactForm";
import { useState } from "react";

function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (!copied) {
        await navigator.clipboard.writeText("mrs11.djmanaloto@gmail.com");
        setCopied(true);
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 lg:flex-row lg:gap-16 justify-between">
      {/* Contact Information */}
      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Have a project in mind?
          </h1>

          <p className="mt-4 max-w-xl text-gray-600">
            Tell me what you're building and when you need it. I reply to every
            message within two working days.
          </p>
        </div>

        <div className="w-full">
          {/* Email */}
          <div className="flex flex-col gap-2 border-y border-gray-300 p-3 md:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 font-medium sm:w-16">Email</span>

            <span className="min-w-0 break-all text-sm sm:text-base">
              mrs11.djmanaloto@gmail.com
            </span>

            <button
              className="w-fit shrink-0 text-sm underline sm:ml-auto"
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Github */}
          <div className="flex flex-col gap-2 border-b border-gray-300 p-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 font-medium sm:w-16">Github</span>

            <a href="https://www.github.com/DanielManaloto" className="min-w-0 break-all text-sm sm:text-base">
              github.com/DanielManaloto
            </a>
          </div>

          {/* LinkedIn */}
          <div className="flex flex-col gap-2 border-b border-gray-300 p-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 font-medium sm:w-16">LinkedIn</span>

            <a href="https://www.linkedin.com/in/daniel-james-manaloto-71a353318/" className="min-w-0 break-all text-sm sm:text-base">
              https://www.linkedin.com/in/daniel-james-manaloto-71a353318/
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full min-w-0 flex-1">
        <ContactForm />
      </div>
    </div>
  );
}

export default Contact;