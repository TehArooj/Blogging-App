import { BallTriangle } from "react-loader-spinner";

const LoaderSpinner = () => {
  return (
    <div className="absolute top-2/4 left-2/4">
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

export default LoaderSpinner;
