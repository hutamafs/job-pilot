interface ContainerProps {
  className?: string;
  backgroundColor?: string;
  children: React.ReactNode;
  maxWidth?: number;
  width?: string;
}

const Container: React.FC<ContainerProps> = ({ className = '', backgroundColor = "bg-white", children, maxWidth=
  1320, width = "w-full"
 }) => (
  <div className={`w-full flex items-center justify-center ${backgroundColor} mx-auto p-6 lg:p-8 ${className}`}>
    <div className={`${width} max-w-[${maxWidth}px]`}>
      {children}
    </div>
  </div>
);

export default Container;
