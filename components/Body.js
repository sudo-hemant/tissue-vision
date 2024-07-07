import SubHeader from "./SubHeader";

const Body = ({ children, subHeaderText }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <SubHeader text={subHeaderText} />

      {children}
    </div>
  );
};

export default Body;
