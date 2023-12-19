"use client";

interface IProps {
  isLoading: boolean;
  type?: string;
  icon: any;
}
const LoadingIconButton: React.FC<IProps> = ({ isLoading, icon: Icon }) => {
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
        <button type="submit" className="icon-button">
          {Icon && <Icon style={{ color: "grey" }} size={30} />}
        </button>
      )}
    </>
  );
};

export default LoadingIconButton;
