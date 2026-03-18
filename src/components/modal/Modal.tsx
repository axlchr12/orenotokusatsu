import { useEffect, useState } from 'react';
import type { TranslateProps } from '../../dataHook';
import classNames from 'classnames';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  translate: TranslateProps;
  children: React.ReactNode;
};

export const Modal = ({
  show,
  onClose,
  title,
  translate,
  children,
}: ModalProps) => {
  const [render, setRender] = useState(show);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (show) {
      setRender(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      timer = setTimeout(() => {
        setRender(false);
        setIsClosing(false);
      }, 200);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [show]);

  if (!render) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={classNames(
            'fixed inset-0 bg-black/55 backdrop-blur-sm transition-opacity',
            {
              'animate-fade-out': isClosing,
              'animate-fade-in': !isClosing,
            },
          )}
          onClick={onClose}
        />

        <div
          className={classNames(
            'relative bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-2xl transform transition-all overflow-hidden',
            {
              'animate-modal-out': isClosing,
              'animate-modal-in': !isClosing,
            },
          )}
        >
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              {translate(title)}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl cursor-pointer"
            >
              &times;
            </button>
          </div>

          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </>
  );
};
