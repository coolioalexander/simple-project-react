import { ReactNode, useState } from 'react';
import styles from './Alert.module.css';

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
    <div className={`${styles.container} ${styles[type]}`}>
      <div className={styles.header}>
        <span
          className={styles.headerIcon}
          role="img"
          aria-label={type === 'warning' ? 'Warning' : 'Information'}
        >
          {type === 'warning' ? '⚠️' : 'ℹ️'}
        </span>
        <span className={styles.headerText}>{heading}</span>
        {closeable && (
          <button className={styles.closeButton} role="img" aria-label="Close">
            <span onClick={handleClose}>❌</span>
          </button>
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
