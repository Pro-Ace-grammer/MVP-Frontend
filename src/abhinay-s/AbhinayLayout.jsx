import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function AbhinayLayout({ keycloak }) {

  return (
    <>
      <Header
        keycloak={keycloak}
        style={{ position: "sticky", top: 0, zIndex: 1000 }}
      />

      <Outlet />
    </>
  );
}