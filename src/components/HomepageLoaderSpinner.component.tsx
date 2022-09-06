import { BallTriangle } from "react-loader-spinner";

const HomepageLoaderSpinner = () => {
  return (
    <div className="absolute top-[45%] left-1/2">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  );
};

export default HomepageLoaderSpinner;
