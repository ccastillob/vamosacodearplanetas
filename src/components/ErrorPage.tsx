export const ErrorPage = ({ message }: { message: string }) => {
  const onRefreshPage = () => {
    window.location.href = "/planets/jupiter/overview";
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <img
        className="w-[200px] md:w-[300px]"
        src="/assets/planet-error.png"
        alt="error planet earth"
      />
      <h1 className="text-white font-antonio font-bold text-24 tracking-1 md:text-40">
        {message}
      </h1>
      <button
        onClick={onRefreshPage}
        className="uppercase hover:bg-uranus hover:text-darkBlue flex items-center border border-uranus py-2 px-5 lg:py-3 lg:px-7 text-white font-spartan font-bold text-9 leading-25 tracking-1.93 lg:text-12 lg:tracking-2.57 mt-4"
      >
        Try again
      </button>
    </div>
  );
};
