import Head from "next/head";

export default function PageTitle({ title }) {
  return (
    <Head>
      <title>{title} | SCWallet</title>
      <meta
        name="description"
        content={`${title} page of SCWallet, a money transfer app.`}
      />
    </Head>
  );
}
