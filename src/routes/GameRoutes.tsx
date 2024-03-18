import React, { Outlet, useNavigate } from "react-router-dom";
import { MainLayout } from "../components/MainLayout/MainLayout";
import { useEffect } from "react";

export const GameRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/')
  }, [])
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}