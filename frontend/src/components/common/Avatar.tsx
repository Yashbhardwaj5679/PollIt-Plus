import React from 'react';
import { User } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { getInitials } from '../../utils/helpers';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Avatar({
  src,
  name = '',
  size = 'md',
  className,
}: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const avatarClasses = cn(
    'rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg',
    sizes[size],
    className
  );

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(avatarClasses, 'object-cover')}
      />
    );
  }

  return (
    <div className={avatarClasses}>
      {name ? getInitials(name) : <User className="w-1/2 h-1/2" />}
    </div>
  );
}