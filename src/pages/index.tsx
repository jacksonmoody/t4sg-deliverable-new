/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { type NextPage } from "next";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const hello = api.example.hello.useQuery({ text: user?.email ?? "" });
  const userMutation = api.example.addUser.useMutation();

  if (!user)
    return (
      <main>
        <Auth
          redirectTo="http://localhost:3000/"
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
          providers={["github"]}
          socialLayout="horizontal"
        />
      </main>
    );

  return (
    <>
      <main>
        <p>Welcome to the T4SG starter project!</p>
        <p>
          This starter project comes unstyled, so we recommend you add your own styling/component library. See README
          for recommendations!
        </p>
        <p>{hello.data ? hello.data.greeting : "Loading tRPC query..."}</p>
        <button onClick={() => supabaseClient.auth.signOut()}>Logout</button>
        <button onClick={() => userMutation.mutate({ name: "New Person", email: user.email ?? "" })}>Process</button>
      </main>
    </>
  );
};

export default Home;
