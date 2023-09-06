import { ReactNode, useState } from 'react';
import './Alert.css';

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
    <div className={`container ${type}`}>
      <div className="header">
        <span
          className="header-icon"
          role="img"
          aria-label={type === 'warning' ? 'Warning' : 'Information'}
        >
          {type === 'warning' ? '⚠️' : 'ℹ️'}
        </span>
        <span className="header-text">{heading}</span>
        {closeable && (
          <button className="close-button" role="img" aria-label="Close">
            <span onClick={handleClose}>❌</span>
          </button>
        )}
      </div>
      <div className="content">{children}</div>
    </div>
  );
}
