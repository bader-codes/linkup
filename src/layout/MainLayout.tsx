import Header from "#components/header/Header.tsx";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="mt-3">
        <Outlet />
      </main>
    </>
  );
}
