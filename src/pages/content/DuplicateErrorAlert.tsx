import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

type DuplicateErrorAlertProps = {
  message: string;
  onClose: () => void;
};

export const DuplicateErrorAlert = ({
  message,
  onClose,
}: DuplicateErrorAlertProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(handleClose, 3000);
    return () => clearTimeout(timer);
  }, [handleClose]);

  return (
    <div
      className={classNames(
        'fixed top-32 left-1/2 -translate-x-1/2 p-3 sm:p-0 w-[90%] max-w-sm duration-300 z-50 transition-all',
        {
          'animate-fade-out': isExiting,
          'animate-fade-in': !isExiting,
        },
      )}
    >
      <div className="flex items-center p-4 border rounded-xl shadow transition-all bg-red-50 border-red-200 text-red-800">
        <div className="flex-1 text-xs sm:text-sm font-medium">{message}</div>
        <button
          onClick={handleClose}
          className="hover:bg-black/5 p-1 rounded-xl transition-all duration-200 text-sm text-red-800 cursor-pointer active:scale-75"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
