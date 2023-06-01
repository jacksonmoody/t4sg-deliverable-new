/* eslint-disable @typescript-eslint/no-misused-promises */
import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { type NextPage } from "next";
import BasicTable from "~/components/BasicTable";
import EntryModal from "~/components/EntryModal";
import { api } from "~/utils/api";
import type { Entry } from "~/utils/categories";

const Home: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const { data: entries } = api.main.getLoggedIn.useQuery({
    user_id: user?.id !== undefined ? user.id : "",
  });

  const emptyEntry: Entry = {
    name: "",
    link: "",
    description: "",
    user: "",
    category: 0,
    user_id: "",
    id: "",
  };

  if (!user)
    return (
      <main>
        <div>
          <h1>Welcome to Links for Climate Good!</h1>
          <h3>Please sign-in with your Github account:</h3>
          <Button
            startIcon={<GitHubIcon />}
            style={{
              backgroundColor: "#333",
              minHeight: "50px",
            }}
            variant="contained"
            onClick={() => supabaseClient.auth.signInWithOAuth({ provider: "github" })}
          >
            Sign in with GitHub
          </Button>
        </div>
      </main>
    );

  return (
    <main>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={3}>
            <EntryModal entry={emptyEntry} type="add" />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {entries && <BasicTable entries={entries} />}
        </Grid>
      </Grid>
    </main>
  );
};

export default Home;
