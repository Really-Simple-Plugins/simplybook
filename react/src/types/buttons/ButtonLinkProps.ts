export interface ButtonLinkProps {
    className?: string;
    children: React.ReactNode;
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
    | string
    | undefined;
    disabled?: boolean;
    target?: string;
    loginLink?: string;
    link?: string;
    linkClassName?: string;
    onClick?: () => void;
    icon?: boolean;
    iconName?: string;
    iconSize?: string;
    iconClass?: string;
    iconStyle?: React.CSSProperties;
    reverseIcon?: boolean;
    name?: string;
  }