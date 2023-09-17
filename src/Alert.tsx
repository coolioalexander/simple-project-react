import { ReactNode, useState } from 'react';
import { ReactComponent as WarningIcon } from './warning.svg';
import { ReactComponent as InfoIcon } from './info.svg';
import { ReactComponent as CrossIcon } from './cross.svg';

type Props = {
  type?: string;
  heading: string;
  closeable?: boolean;
  onClose?: () => void;
  children: ReactNode;
};

export default function Alert({
  type = 'information',
  heading,
  closeable,
  onClose,
  children,
}: Props) {
  const [visible, setVisible] = useState<boolean>(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`inline-flex flex-col text-left py-3 px-4 rounded-md border-1 border-transparent 
    ${type === 'warning' ? 'text-amber-900 bg-amber-50' : 'text-teal-900 bg-teal-50'}`}
    >
      <div className="flex items-center mb-1">
        <span
          className="w-7"
          role="img"
          aria-label={type === 'warning' ? 'Warning' : 'Information'}
        >
          {type === 'warning' ? (
            <WarningIcon className="fill-amber-900 w-5 h-5" />
          ) : (
            <InfoIcon className="fill-teal-900 w-5 h-5" />
          )}
        </span>
        <span className="font-bold">{heading}</span>
        {closeable && (
          <button
            className="border-none bg-transparent ml-auto cursor-pointer"
            role="img"
            aria-label="Close"
          >
            <span onClick={handleClose}>
              <CrossIcon />
            </span>
          </button>
        )}
      </div>
      <div className="ml-7 text-black">{children}</div>
    </div>
  );
}
