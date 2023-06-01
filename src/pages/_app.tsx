import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { type Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { type AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import Layout from "~/components/Layout";
import "~/styles/globals.css";
import { api } from "~/utils/api";

// https://nextjs.org/docs/pages/building-your-application/styling/css-modules

// For more on custom App component: https://nextjs.org/docs/pages/building-your-application/routing/custom-app

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  return (
    <>
      <Head>
        <title>T4SG Deliverable</title>
        <meta name="description" content="T4SG Deliverable Built on T3 Tech Stack" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      </Head>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionContextProvider>
    </>
  );
}

export default api.withTRPC(MyApp);
