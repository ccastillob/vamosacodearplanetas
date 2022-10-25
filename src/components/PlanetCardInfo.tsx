import { usePlanet } from "../hooks";
import { CardInfo } from "./CardInfo";

export const PlanetCardInfo = () => {
  const { planetCurrent } = usePlanet();
  const info = {
    "ROTATION TIME": planetCurrent?.rotation,
    "REVOLUTION TIME": planetCurrent?.revolution,
    RADIUS: planetCurrent?.radius,
    "AVERAGE TEMP.": planetCurrent?.temperature,
  };

  return (
    <section className="flex flex-col justify-center items-center gap-2 text-white mt-7 mb-12 px-6 md:flex-row md:mx-6 md:px-4 md:mb-9 md:gap-[11px] lg:gap-[30px] lg:mt-12 lg:mb-14 lg:mx-8 xl:mx-auto xl:w-3/4">
      {Object.entries(info).map(([title, value]) => {
        return <CardInfo key={title} title={title} value={value} />;
      })}
    </section>
  );
};
