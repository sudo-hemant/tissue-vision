const Folder = ({ text, onClick }) => {
  return (
    <button
      onClick={(e) => onClick(e, text)}
      className="flex flex-col justify-center items-start gap-2 p-4 w-80 h-32  bg-gray-300 rounded-3xl"
    >
      <div className="text-2xl truncate w-11/12 text-left">{text}</div>
      <div className="text-base">Created on: April 6, 2024</div>
    </button>
  );
};

export default Folder;
