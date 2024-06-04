import {RequiresAuthorization} from "@/hooks/auth";
import Layout from "@/Layout";

export function Landing() {
  return (
    <RequiresAuthorization>
      <Layout />
    </RequiresAuthorization>
  );
}
