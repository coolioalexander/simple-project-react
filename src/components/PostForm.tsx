import { NewPost } from '../posts/types';
import { useForm, FieldError } from 'react-hook-form';
import ValidationError from './ValidationError';

type Props = {
  onSave: (newPost: NewPost) => void;
};

export default function PostForm({ onSave }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewPost>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const fieldStyle = 'flex flex-col mb-2 text-xs';
  const inputStyle = 'h-6 text-xs';
  const textareaStyle = 'h-15 text-xs';

  const editorStyle = (fieldError: FieldError | undefined) => {
    return fieldError ? 'border-red-500' : '';
  };

  const handleSave = (newPost: NewPost) => {
    reset();
    onSave(newPost);
  };

  return (
    <form noValidate className="border-b pb-2" onSubmit={handleSubmit(handleSave)}>
      <div className={fieldStyle}>
        <label htmlFor="title">Title</label>
        <input
          className={`${inputStyle} ${editorStyle(errors.title)}`}
          type="text"
          id="title"
          {...register('title', { required: 'You must enter a title' })}
        />
        <ValidationError fieldError={errors.title} />
      </div>
      <div className={fieldStyle}>
        <label htmlFor="description">Description</label>
        <textarea
          className={textareaStyle}
          id="description"
          {...register('description', { required: 'You must enter a description' })}
        />
        <ValidationError fieldError={errors.description} />
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white text-xs font-semibold mt-2 h-7 px-6"
        >
          Save
        </button>
      </div>
      {isSubmitSuccessful && (
        <div role="alert" className="text-green-600 text-xs mt-2">
          Post saved successfully
        </div>
      )}
    </form>
  );
}
