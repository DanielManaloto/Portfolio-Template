import ContactForm from "./ContactForm";
import { useState } from "react";
import content from "../content.json";

const contacts = content.contact;

function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (!copied) {
        await navigator.clipboard.writeText(contacts.email);
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

          <p className="mt-4 max-w-xl text-muted-foreground">
            Tell me what you're building and when you need it. I reply to every
            message within two working days.
          </p>
        </div>

        <div className="w-full">
          {/* Email */}
          <div className="flex flex-col gap-2 border-y border-border  p-3 md:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 font-medium sm:w-16">Email</span>

            <span className="min-w-0 break-all text-sm sm:text-base">
              {contacts.email}
            </span>

            <button
              className="w-fit shrink-0 text-sm hover:underline hover:bg-muted-foreground sm:ml-auto"
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Github */}
          <div className="flex flex-col gap-2 border-b border-border  p-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 font-medium sm:w-16">Github</span>

            <a href={`${contacts.github}`} className="min-w-0 break-all text-sm sm:text-base hover:underline">
              {contacts.github.slice(8,100)}
            </a>
          </div>

          {/* LinkedIn */}
          <div className="flex flex-col gap-2 border-b border-border  p-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 font-medium sm:w-16">LinkedIn</span>

            <a href={`${contacts.linkedin}`} className="min-w-0 break-all text-sm sm:text-base hover:underline">
              {contacts.linkedin}
            </a>
          </div>

          {/* Facebook */}
          <div className="flex flex-col gap-2 border-b border-border  p-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 font-medium sm:w-16">Facebook</span>

            <a href={`${contacts.facebook}`} className="min-w-0 break-all text-sm sm:text-base hover:underline">
              {contacts.facebook}
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