import { ReactNode } from "react";
import Head from "next/head";

type LayoutProps = {
  title: string;
  children: ReactNode;
};

/**
 * Creates the basic layout for every view and sets some important headers.
 */
const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
        <meta
          name="description"
          content="You can't work with multiple timers in mind? Try Cronos and forget about them."
        />
      </Head>
      <div className="min-h-screen bg-gray-300">
        <header className="text-white bg-indigo-600 p-4 text-center">
          <h1 className="text-white font-bold cursor-default">{title}</h1>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
