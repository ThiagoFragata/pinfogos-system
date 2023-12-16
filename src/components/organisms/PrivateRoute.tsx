import { APP_ROUTES } from "@/constants/app.routes";
import { checkUserAuthenticated } from "@/functions/checkUserAuthenticated";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { push } = useRouter();
  const isAuthenticated = checkUserAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      push(APP_ROUTES.public.login);
    }
  }, [isAuthenticated, push]);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
}
