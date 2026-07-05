const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-[#3e3e42]"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ffa116] animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
