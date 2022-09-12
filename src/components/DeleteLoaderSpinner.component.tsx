import { BallTriangle } from "react-loader-spinner";

const DeleteLoaderSpinner = () => {
  return (
    <div className="absolute left-[40%] top-[20%] m:left-[30%] tb:top-[25%]">
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

export default DeleteLoaderSpinner;
