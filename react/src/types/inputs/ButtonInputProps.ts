export type ButtonInputProps = {
  children: React.ReactNode;
  onClick?: () => void;
  link?: {
    to: string;
    from?: string;
  };
  btnVariant?: 
  | "primary" 
  | "primary-small" 
  | "secondary" 
  | "secondary-small" 
  | "tertiary" 
  | "tertiary-small" 
  | "ghost" 
  | "ghost-small" 
  | "square" 
  | "square-ghost" 
  | "square-ghost-small" 
  | "square-small" 
  | undefined;
  disabled?: boolean;
  buttonDisabledAttribute?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;