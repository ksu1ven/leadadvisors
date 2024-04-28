import { Header } from "../layout/Header";
import { Main } from "../layout/Main";
import { Footer } from "../layout/Footer";
import { Events } from "../layout/Events";

export function LandingPage() {
  return (
    <>
      <section className="grid-100vh">
        <div className="layout-90">
          <Header />
          <Main />
        </div>
        <Footer />
      </section>
      <Events />
    </>
  );
}
