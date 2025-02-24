interface ContainerProps {
  className?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ className, backgroundColor = "bg-white", children }) => (
  <div className={`w-full flex items-center justify-center ${backgroundColor} mx-auto p-4 ${className}`}>
    <div className="w-full max-w-[1320px]">
      {children}
    </div>
  </div>
);

export default Container;
