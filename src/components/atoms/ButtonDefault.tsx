import { Button, ButtonProps } from "../ui/button";

interface ButtonDefaultProps extends ButtonProps {
  label: string;
}

export function ButtonDefault({ className, label }: ButtonDefaultProps) {
  return <Button className={className}>{label}</Button>;
}
