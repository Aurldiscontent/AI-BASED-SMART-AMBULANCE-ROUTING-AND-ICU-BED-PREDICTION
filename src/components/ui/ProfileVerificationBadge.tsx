
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type VerificationStatus = 'verified' | 'pending' | 'unverified';

interface ProfileVerificationBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md' | 'lg';
}

const ProfileVerificationBadge: React.FC<ProfileVerificationBadgeProps> = ({
  status,
  size = 'md',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getSize = () => {
    switch (size) {
      case 'sm':
        return { icon: 14, badge: 'h-5 w-5' };
      case 'lg':
        return { icon: 20, badge: 'h-7 w-7' };
      default:
        return { icon: 16, badge: 'h-6 w-6' };
    }
  };

  const sizeConfig = getSize();

  const getBadgeContent = () => {
    switch (status) {
      case 'verified':
        return {
          icon: <ShieldCheck size={sizeConfig.icon} className="text-green-500" />,
          text: 'Verified Account',
          bgColor: isDark ? 'bg-green-900/30' : 'bg-green-100',
          textColor: isDark ? 'text-green-300' : 'text-green-700',
          borderColor: isDark ? 'border-green-800/50' : 'border-green-200',
        };
      case 'pending':
        return {
          icon: <Shield size={sizeConfig.icon} className="text-amber-500" />,
          text: 'Verification Pending',
          bgColor: isDark ? 'bg-amber-900/30' : 'bg-amber-100',
          textColor: isDark ? 'text-amber-300' : 'text-amber-700',
          borderColor: isDark ? 'border-amber-800/50' : 'border-amber-200',
        };
      case 'unverified':
        return {
          icon: <ShieldAlert size={sizeConfig.icon} className="text-gray-500" />,
          text: 'Not Verified',
          bgColor: isDark ? 'bg-gray-800/50' : 'bg-gray-100',
          textColor: isDark ? 'text-gray-400' : 'text-gray-600',
          borderColor: isDark ? 'border-gray-700/50' : 'border-gray-200',
        };
    }
  };

  const badgeContent = getBadgeContent();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            className={`${sizeConfig.badge} rounded-full flex items-center justify-center ${badgeContent.bgColor} ${badgeContent.borderColor} border`}
          >
            {badgeContent.icon}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          <p className={`text-xs ${badgeContent.textColor}`}>{badgeContent.text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProfileVerificationBadge;
