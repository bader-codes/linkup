import ScrollToTop from "@/components/shared/ScrollToTop";
import Header from "@/components/header/Header.tsx";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Header />

      <ScrollToTop />
      <main className="pt-20">
        <Outlet />
      </main>
    </>
  );
}
