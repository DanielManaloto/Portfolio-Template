import ContactForm from "./ContactForm";

function Contact() {
  return (
    <>
      <div className="flex gap-10">
        <div className="flex flex-col gap-10">
          <h1>Have a project in mind?</h1>
          <p>
            Tell me what you're building and when you need it. I reply to every
            message within two working days.
          </p>
          <div>
            <p className="flex border-y border-gray-300 p-2">
              <span className="w-40 shrink-0">Email</span>
              <span>mrs11.djmanaloto@gmail.com</span>
              <button>Copy</button>
            </p>

            <p className="flex border-b border-gray-300 p-2">
              <span className="w-40 shrink-0">Github</span>
              <span>github.com/DanielManaloto</span>
            </p>
            <p className="flex border-b border-gray-300 p-2">
              <span className="w-40 shrink-0">LinkedIn</span>
              <span>
                https://www.linkedin.com/in/daniel-james-manaloto-71a353318/
              </span>
            </p>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default Contact;
