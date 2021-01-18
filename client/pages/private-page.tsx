import { useIsAuth } from "../lib/use-is-auth";

export default function PrivatePage() {
  useIsAuth();

  return <div>Private Page</div>;
}
