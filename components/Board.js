import Head from "next/head";

export default function Board({ children, title, actionButton }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex mx-5 h-full flex-col">
        <div className="h-16 grid grid-cols-12">
          <div className="col-span-6 flex items-center">
            <h1 className="text-3xl font-bold text-teal-700">
              {title}
            </h1>
          </div>

          <div className="col-span-6 flex items-center justify-end">{actionButton}</div>
        </div>

        <div className="rounded-lg w-full grow mb-3 overflow-y-auto bg-teal-100">
          {children}
        </div>
      </div>
    </>
  );
}
