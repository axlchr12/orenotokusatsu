import { useEffect } from 'react';

type DuplicateErrorAlertProps = {
  message: string;
  onClose: () => void;
};

export const DuplicateErrorAlert = ({
  message,
  onClose,
}: DuplicateErrorAlertProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 p-3 sm:p-0 z-full w-full max-w-sm duration-300">
      <div className="flex items-center p-4 border rounded-xl shadow-xl transition-shadow bg-red-50 border-red-200 text-red-800">
        <div className="flex-1 text-xs sm:text-sm font-medium">{message}</div>
        <button
          onClick={onClose}
          className=" hover:bg-black/5 transition-colors text-sm text-red-800"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
