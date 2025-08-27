
import type { Iroutes } from "@/utils/publicRoutes";
import React from "react";




export const generateRoutes = (routes: Iroutes[]) => {
  return routes.map((item): { Component: React.FC; path: string } => ({
    Component: item.Component,
    path: item.path,
  }));
};
