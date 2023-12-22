"use client";

interface IProps {
  isLoading: boolean;
  button: any;
  size?: number;
}
const LoadingButton: React.FC<IProps> = ({
  isLoading,
  button: Button,
  size = 10,
}) => {
  const SpinningCircle = () => {
    return (
      <div
        className={`w-${size} h-${size} border-4 rounded-full border-slate-600 border-solid border-t-transparent border-b-transparent animate-spin`}
      ></div>
    );
  };

  return <>{isLoading ? <SpinningCircle /> : Button}</>;
};

export default LoadingButton;
