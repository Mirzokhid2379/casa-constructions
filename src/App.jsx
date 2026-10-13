import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import { SiteHead } from "./seo/Head.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

import Projects from "./pages/Projects.jsx";
import { ProjectNavoiy, ProjectTalimarjon } from "./pages/Project.jsx";
import Process from "./pages/Process.jsx";
import Company from "./pages/Company.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <SiteHead />
      <ScrollToTop />
      <Header />
      <main className="page" key={pathname}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loyiha" element={<Projects />} />
            <Route path="/loyiha/navoiy" element={<ProjectNavoiy />} />
            <Route path="/loyiha/talimarjon" element={<ProjectTalimarjon />} />
            <Route path="/jarayon" element={<Process />} />
            <Route path="/kompaniya" element={<Company />} />
            <Route path="/aloqa" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
