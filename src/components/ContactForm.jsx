function ContactForm() {
  return (
    <div className="min-h-screen p-4">
      <div className="w-full max-w-[361px] rounded-[4px] border border-slate-300 px-[26px] py-[27px]">
        <form className="space-y-0">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[13px] leading-4 text-slate-950"
            >
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="h-[38px] w-full rounded-[3px] border border-slate-300 bg-slate-100 px-3 outline-none focus:border-slate-500"
            />
          </div>

          <div className="mt-[17px]">
            <label
              htmlFor="email"
              className="mb-2 block text-[13px] leading-4 text-slate-950"
            >
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="h-[38px] w-full rounded-[3px] border border-slate-300 bg-slate-100 px-3 outline-none focus:border-slate-500"
            />
          </div>

          <div className="mt-[17px]">
            <label
              htmlFor="message"
              className="mb-2 block text-[13px] leading-4 text-slate-950"
            >
              What do you need?
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="h-[112px] w-full resize rounded-[3px] border border-slate-300 bg-slate-100 px-3 py-2 outline-none focus:border-slate-500"
            />
          </div>

          {/* Placeholder only — no functionality */}
          <button
            type="button"
            className="mt-[14px] h-[39px] rounded-[3px] bg-slate-900 px-[18px] text-[13px] font-semibold text-white"
          >
            Open email draft
          </button>

          <p className="mt-[15px] text-[12px] leading-[19px] text-slate-500">
            This opens a draft in your email app. Nothing is sent until
            <br />
            you press send there.
          </p>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;