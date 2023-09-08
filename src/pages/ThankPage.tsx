import { useParams } from 'react-router-dom';

export default function ThankPage() {
  const { name } = useParams<{ name: string | undefined }>();

  return (
    <div className="flex flex-col py-10 mx-auto max-w-md">
      <div className="p-5 bg-green-100 text-green-700 text-sm">
        Thanks {name}, we'll be in touch shortly
      </div>
    </div>
  );
}
