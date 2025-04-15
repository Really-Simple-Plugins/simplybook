export type ButtonInputProps = {
  children: React.ReactNode;
  onClick?: () => void;
  link?: {
    to: string;
    from?: string;
  };
  btnVariant?: "primary" | "secondary" | "tertiary" | "premium";
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;