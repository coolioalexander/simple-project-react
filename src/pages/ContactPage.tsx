import { useNavigate } from 'react-router-dom';
import { useForm, FieldError } from 'react-hook-form';
import ValidationError from '../components/ValidationError';

type Contact = {
  name: string;
  email: string;
  reason: string;
  notes: string;
};

export function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Contact>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const navigate = useNavigate();

  const fieldStyle = 'flex flex-col mb-2 text-xs';
  const inputStyle = 'h-6 text-xs';
  const selectStyle = 'h-6 text-xs py-1';
  const textareaStyle = 'h-15 text-xs';

  const editorStyle = (fieldError: FieldError | undefined) => {
    return fieldError ? 'border-red-500' : '';
  };

  const submitContact = (contact: Contact) => {
    console.log('Details submitted', contact);
    return navigate(`/thank/${contact.name}`);
  };

  return (
    <div className="flex flex-col py-10 mx-auto max-w-md">
      <h2 className="text-xl font-semibold underline mb-3">Contact us</h2>
      <p className="text-xs mb-3">Enter your details and we'll get back to you asap.</p>
      <form noValidate onSubmit={handleSubmit(submitContact)}>
        <div className={fieldStyle}>
          <label htmlFor="name">Your name</label>
          <input
            className={`${inputStyle} ${editorStyle(errors.name)}`}
            type="text"
            id="name"
            {...register('name', { required: 'You must enter your name' })}
          />
          <ValidationError fieldError={errors.name} />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Your address email</label>
          <input
            className={`${inputStyle} ${editorStyle(errors.email)}`}
            type="email"
            id="email"
            {...register('email', {
              required: 'You must enter your address email',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value must match an email format',
              },
            })}
          />
          <ValidationError fieldError={errors.email} />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="reason">Reason you need to contact us</label>
          <select
            className={`${selectStyle} ${editorStyle(errors.reason)}`}
            id="reason"
            {...register('reason', { required: 'You must enter your reason of contacting us' })}
          >
            <option value=""></option>
            <option value="Support">Support</option>
            <option value="Feedback">Feedback</option>
          </select>
          <ValidationError fieldError={errors.reason} />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="notes">Additional notes</label>
          <textarea className={textareaStyle} id="notes" {...register('notes')} />
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white text-xs font-semibold mt-2 h-7 px-6"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
