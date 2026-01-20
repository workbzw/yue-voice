import { ReactNode } from 'react';

interface GridItemProps {
  icon: string | ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  disabled?: boolean;
  disabledText?: string;
}

export default function GridItem({ icon, title, description, onClick, disabled = false, disabledText }: GridItemProps) {
  return (
    <div 
      className={`bg-white border border-green-500/50 dark:bg-gray-800 dark:border dark:border-green-500/50 rounded-lg shadow-sm dark:shadow-gray-900/50 transition-shadow duration-200 p-6 ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:shadow-md cursor-pointer hover:border-green-500/60 dark:hover:border-green-500/60'
      }`}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`mb-4 flex justify-center ${disabled ? 'text-gray-400 dark:text-gray-400' : 'text-green-600 dark:text-green-400'}`}>
          {typeof icon === 'string' ? (
            <div className="text-4xl">{icon}</div>
          ) : (
            icon
          )}
        </div>
        <h3 className={`text-lg font-semibold mb-2 ${disabled ? 'text-gray-400 dark:text-gray-300' : 'text-gray-900 dark:text-gray-100'}`}>
          {title}
        </h3>
        <p className={`text-sm ${disabled ? 'text-gray-400 dark:text-gray-300' : 'text-gray-600 dark:text-gray-300'}`}>
          {disabled && disabledText ? disabledText : description}
        </p>
      </div>
    </div>
  );
}