import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./importMap";
import config from "@payload-config";
import type { ServerFunctionClient } from "payload";
import React from "react";
import "@payloadcms/next/css";

type Args = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Args) {
  const serverFunction: ServerFunctionClient = async function (args) {
    "use server";
    return handleServerFunctions({ ...args, config, importMap });
  };

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
