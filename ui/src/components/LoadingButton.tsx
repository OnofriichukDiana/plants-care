"use client";

interface IProps {
  isLoading: boolean;
  signature: string;
  onClick?: () => void;
}
const LoadingButton: React.FC<IProps> = ({ isLoading, signature, onClick }) => {
  const SpinningCircle = () => {
    return (
      <div className="w-10 h-10 border-4 rounded-full border-neutral-400 border-solid border-t-transparent border-b-transparent animate-spin"></div>
    );
  };

  return (
    <>
      {isLoading ? (
        <SpinningCircle />
      ) : (
        <button type="submit" className="w-20" onClick={onClick}>
          {signature}
        </button>
      )}
    </>
  );
};

export default LoadingButton;
