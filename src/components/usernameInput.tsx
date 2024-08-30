import * as React from 'react';

import { cn } from '../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const UserNameInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return <input type={type} className={cn('flex h-10 w-full rounded-md border border-white/50 bg-white/50 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:none disabled:cursor-not-allowed disabled:opacity-50', className)} ref={ref} {...props} />;
});
UserNameInput.displayName = 'Input';

export { UserNameInput };
