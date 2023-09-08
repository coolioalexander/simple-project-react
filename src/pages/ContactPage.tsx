import { ActionFunctionArgs, Form, redirect } from 'react-router-dom';

type Contact = {
  name: string;
  email: string;
  reason: string;
  notes: string;
};

export const contactPageAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const contact = {
    name: formData.get('name'),
    email: formData.get('email'),
    reason: formData.get('reason'),
    notes: formData.get('notes'),
  };
  console.log('Details submitted', contact);
  return redirect(`/thank/${formData.get('name')}`);
};

export function ContactPage() {
  const fieldStyle = 'flex flex-col mb-2 text-xs';
  const inputStyle = 'h-6 text-xs';
  const selectStyle = 'h-6 text-xs py-1';
  const textareaStyle = 'h-15 text-xs';

  return (
    <div className="flex flex-col py-10 mx-auto max-w-md">
      <h2 className="text-xl font-semibold underline mb-3">Contact us</h2>
      <p className="text-xs mb-3">Enter your details and we'll get back to you asap.</p>
      <Form method="post">
        <div className={fieldStyle}>
          <label htmlFor="name">Your name</label>
          <input className={inputStyle} type="text" id="name" name="name" required />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Your address email</label>
          <input
            className={inputStyle}
            type="email"
            id="email"
            name="email"
            required
            pattern="\S+@\S+.\S+"
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="reason">Reason you need to contact us</label>
          <select className={selectStyle} id="reason" name="reason" required>
            <option value=""></option>
            <option value="Support">Support</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="notes">Additional notes</label>
          <textarea className={textareaStyle} id="notes" name="notes" />
        </div>
        <div>
          <button className="bg-black text-white text-xs font-semibold mt-2 h-7 px-6">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}
