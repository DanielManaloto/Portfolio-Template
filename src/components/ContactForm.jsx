import { useState } from "react";
import content from "../content.json";

const { email: contactEmail, formNote } = content.contact;

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const fieldClass =
  "w-full rounded-[3px] border border-input bg-input text-foreground placeholder:text-muted-foreground px-3 outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring disabled:opacity-60";
const labelClass = "mb-2 block text-[13px] leading-4 text-foreground";

const EMPTY = { name: "", email: "", message: "" };

function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  // "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [errorText, setErrorText] = useState("");

  const sending = status === "sending";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (status === "success" || status === "error") setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    // Hidden honeypot: real visitors never see or fill this field.
    if (e.currentTarget.elements.botcheck?.checked) return;

    if (!ACCESS_KEY) {
      setStatus("error");
      setErrorText(
        `The form isn't configured yet. Email me directly at ${contactEmail}.`,
      );
      return;
    }

    setStatus("sending");
    setErrorText("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${values.name.trim()}`,
          from_name: "Portfolio contact form",
          name: values.name.trim(),
          email: values.email.trim(), // becomes the reply-to address
          message: values.message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setValues(EMPTY);
        setStatus("success");
      } else {
        throw new Error(data.message || "Request failed");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setErrorText(
        `Your message wasn't sent. Try again, or email me at ${contactEmail}.`,
      );
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="w-full max-w-[361px] rounded-[4px] border border-border bg-card text-card-foreground px-[26px] py-[27px]">
        <form className="space-y-0" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className={labelClass}>
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={sending}
              value={values.name}
              onChange={handleChange}
              className={`h-[38px] ${fieldClass}`}
            />
          </div>

          <div className="mt-[17px]">
            <label htmlFor="email" className={labelClass}>
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={sending}
              value={values.email}
              onChange={handleChange}
              className={`h-[38px] ${fieldClass}`}
            />
          </div>

          <div className="mt-[17px]">
            <label htmlFor="message" className={labelClass}>
              What do you need?
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              disabled={sending}
              value={values.message}
              onChange={handleChange}
              className={`h-[112px] resize py-2 ${fieldClass}`}
            />
          </div>

          {/* Honeypot spam trap */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <button
            type="submit"
            disabled={sending}
            className="mt-[14px] h-[39px] rounded-[3px] border-primary bg-primary px-[18px] text-[13px] font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send message"}
          </button>

          <div role="status" aria-live="polite" className="mt-[15px] min-h-[19px]">
            {status === "success" && (
              <p className="text-[12px] leading-[19px] text-emerald-600 dark:text-emerald-400">
                Message sent. I'll reply within two working days.
              </p>
            )}
            {status === "error" && (
              <p className="text-[12px] leading-[19px] text-red-600 dark:text-red-400">
                {errorText}
              </p>
            )}
            {(status === "idle" || status === "sending") && (
              <p className="text-[12px] leading-[19px] text-muted-foreground">
                {formNote}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;