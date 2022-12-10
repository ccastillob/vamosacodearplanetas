import { useRoute } from "wouter";
import { usePlanet } from "../hooks";

export const PlanetImage = () => {
  const { planetCurrent } = usePlanet();
  const [, params] = useRoute("/planets/:planetName/:characteristicName");
  const name: string = planetCurrent?.name;
  const planetImages = planetCurrent?.images;
  const planetGeologyImages = planetImages?.geology;
  const dataImages = {
    overview: planetImages?.planet,
    "internal-structure": planetImages?.internal,
    "surface-geology": planetImages?.planet,
  };

  const [characteristicName, images] = Object.entries(dataImages).filter(
    ([title, value]) => params?.characteristicName.includes(title) && value
  )[0];

  return (
    <div className="grid col-span-12 h-[260px] md:h-[426px] lg:col-span-7 lg:h-[670px] relative">
      <picture className="flex items-center justify-center">
        <source srcSet={images.large} media="(min-width: 1024px)"></source>
        <source srcSet={images.medium} media="(min-width: 768px)"></source>
        <img src={images.small} alt={`planet ${name}`} />
      </picture>
      {characteristicName === "surface-geology" && (
        <picture className="absolute top-[75%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <source
            srcSet={planetGeologyImages.large}
            media="(min-width: 1024px)"
          ></source>
          <source
            srcSet={planetGeologyImages.medium}
            media="(min-width: 768px)"
          ></source>
          <img src={planetGeologyImages.small} alt={characteristicName} />
        </picture>
      )}
    </div>
  );
};
