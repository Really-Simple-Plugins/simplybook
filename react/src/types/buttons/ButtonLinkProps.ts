export interface ButtonLinkProps {
    className?: string;
    children: React.ReactNode;
    btnVariant?: string;
    disabled?: boolean;
    target?: string;
    loginLink?: string;
    link?: string;
    onClick?: () => void;
    icon?: boolean;
    iconName?: string;
    iconSize?: string;
    iconClass?: string;
    iconStyle?: React.CSSProperties;
    reverseIcon?: boolean;
    name?: string;
  }