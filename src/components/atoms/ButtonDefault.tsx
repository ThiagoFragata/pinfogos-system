import { Button } from "../ui/button";

interface ButtonDefaultProps {
  label: string;
  className?: string;
}

export function ButtonDefault({ className, label }: ButtonDefaultProps) {
  return <Button className={className}>{label}</Button>;
}
