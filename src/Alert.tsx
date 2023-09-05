import { ReactNode, useState } from 'react';

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
    <div>
      <div>
        <span role="img" aria-label={type === 'warning' ? 'Warning' : 'Information'}>
          {type === 'warning' ? '⚠️' : 'ℹ️'}
        </span>
        <span>{heading}</span>
      </div>
      {closeable && (
        <button role="img" aria-label="Close">
          <span onClick={handleClose}>❌</span>
        </button>
      )}
      <div>{children}</div>
    </div>
  );
}
