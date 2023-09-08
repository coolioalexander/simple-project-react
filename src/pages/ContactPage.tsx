import { FormEvent, ChangeEvent, useState } from 'react';

type Contact = {
  name: string;
  email: string;
  reason: string;
  notes: string;
};

export default function ContactPage() {
  const newContact = {
    name: '',
    email: '',
    reason: '',
    notes: '',
  };
  const [contact, setContact] = useState<Contact>(newContact);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setContact({ ...contact, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Details submitted', contact);
    setContact(newContact);
  };

  const fieldStyle = 'flex flex-col mb-2 text-xs';
  const inputStyle = 'h-6 text-xs';
  const selectStyle = 'h-6 text-xs py-1';
  const textareaStyle = 'h-15 text-xs';

  return (
    <div className="flex flex-col py-10 mx-auto max-w-md">
      <h2 className="text-xl font-semibold underline mb-3">Contact us</h2>
      <p className="text-xs mb-3">Enter your details and we'll get back to you asap.</p>
      <form onSubmit={handleSubmit}>
        <div className={fieldStyle}>
          <label htmlFor="name">Your name</label>
          <input
            className={inputStyle}
            type="text"
            id="name"
            value={contact.name}
            onChange={handleChange}
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Your address email</label>
          <input
            className={inputStyle}
            type="email"
            id="email"
            value={contact.email}
            onChange={handleChange}
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="reason">Reason you need to contact us</label>
          <select
            className={selectStyle}
            id="reason"
            value={contact.reason}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="Support">Support</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="notes">Additional notes</label>
          <textarea
            className={textareaStyle}
            id="notes"
            value={contact.notes}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="bg-black text-white text-xs font-semibold mt-2 h-7 px-6">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
