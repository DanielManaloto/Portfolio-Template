import ContactForm from "./ContactForm";
import { useState } from "react";
import content from "../content.json";

const contacts = content.contact;

// Show a clean version of the URL (no https:// or www.)
const displayUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "");

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
            {contacts.sectionTitle}
          </h1>

          <p className="mt-4 max-w-xl text-muted-foreground">
            {contacts.sectionDescription}
          </p>
        </div>

        <div className="w-full">
          {/* Email */}
          <div className="flex flex-col gap-2 border-y border-border p-3 md:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 font-medium sm:w-20">Email</span>

            <span className="min-w-0 break-all text-sm sm:text-base">
              {contacts.email}
            </span>

            <button
              className="w-fit shrink-0 text-sm text-surface-foreground hover:underline hover:bg-muted sm:ml-auto"
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Other links (GitHub, LinkedIn, Facebook, ...) */}
          {contacts.links?.map((link) => (
            <div
              key={link.label}
              className="flex flex-col gap-2 border-b border-border p-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <span className="shrink-0 font-medium sm:w-20">{link.label}</span>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 break-all text-sm sm:text-base hover:underline"
              >
                {displayUrl(link.url)}
              </a>
            </div>
          ))}
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