import { NavBarButtons } from "./NavBarButtons";
import { NavHeader } from "./NavHeader";
import { Line } from "./Line";

export const MenuPlanets = () => (
  <section className="">
    <header className="flex lg:flex-row md:flex-col md:items-center items-baseline justify-between md:py-1 px-4">
      <h1 className="font-antonio text-white text-28 font-medium uppercase tracking-1.05 md:py-6">
        the planets
      </h1>
      <img
        src="/icon-hamburger-open.svg"
        className="lg:hidden md:hidden h-6 w-6"
        alt="icono de menú para celulares"
      />
      <NavHeader className="lg:flex md:flex sm:hidden md:py-4" />
    </header>
    <Line />
    <NavBarButtons className="lg:hidden md:hidden sm:flex mt-8 " />
  </section>
);
