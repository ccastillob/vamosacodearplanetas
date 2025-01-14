export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <img
        className="w-[200px] animate-bounce md:w-[300px]"
        src="/assets/planet.png"
        alt="spinner planet earth"
      />
      <h1 className="text-white font-antonio font-bold text-24 tracking-1 animate-pulse md:text-40">
        Loading...
      </h1>
    </div>
  );
};
