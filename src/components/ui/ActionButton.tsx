
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ActionButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'medical' | 'emergency' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg' | 'icon' | 'xl';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  fullWidth = false,
  icon,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'medical':
        return 'medical-button text-white';
      case 'emergency':
        return 'emergency-button text-white';
      case 'outline':
        return 'bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800';
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-800 dark:text-gray-300 dark:hover:bg-gray-800/40';
      default:
        return 'neo-button text-gray-800';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-3 py-1.5 rounded-lg';
      case 'lg':
        return 'text-lg px-6 py-3 rounded-xl';
      case 'xl':
        return 'text-xl px-8 py-4 rounded-xl';
      case 'icon':
        return 'p-2 rounded-full aspect-square';
      default:
        return 'text-base px-5 py-2.5 rounded-lg';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          font-medium transition-all duration-300 shadow-sm
          button-hover-elevation
          ${getVariantClass()}
          ${getSizeClass()}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
      >
        <div className="flex items-center justify-center gap-2">
          {icon && <div className="animate-on-hover">{icon}</div>}
          {children}
        </div>
      </Button>
    </motion.div>
  );
};

export default ActionButton;
