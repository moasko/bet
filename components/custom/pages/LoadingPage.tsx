import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="w-full h-full bg-white flex justify-center items-center">
      <Image
        className="animate-pulse"
        src="/brands/logo_user.png"
        width={50}
        height={50}
        alt="Loader"
      />
    </div>
  );
};

export default LoadingPage;
