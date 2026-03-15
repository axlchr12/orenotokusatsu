import classNames from 'classnames';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  isActive: boolean;
};

export const Button = ({ onClick, children, isActive }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'text-white text-xs px-3 py-1.5 rounded transition-colors duration-200',
        {
          'bg-sky-900': isActive,
          'bg-sky-700/40 hover:bg-sky-700/90': !isActive,
        },
      )}
    >
      {children}
    </button>
  );
};
