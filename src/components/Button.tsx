interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { children, type = "button", onClick, className } = props;
  return (
    <button
      type={type}
      className={`rounded-full cursor-pointer px-3 py-2 font-semibold text-white text-center min-w-[80px] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
