interface ButtonProps {
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { children } = props;
  return (
    <div>
      <button className="rounded-full cursor-pointer bg-blue-500 px-3 font-semibold py-2 text-white hover:bg-blue-600">
        {children}
      </button>
    </div>
  );
};

export default Button;
