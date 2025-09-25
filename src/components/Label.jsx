import "./style/label.css";

const Label = ({ text, danger }) => {
  return (
    <span
      className={`label-3d absolute top-[-4px] right-0
        ${danger ? "bg-gradient-to-r from-red-500 to-red-700" : "bg-gradient-to-r from-gray-800 to-gray-800"}
        text-white px-3 py-1 text-xs  tracking-wide`}
    >
      {text}
    </span>
  );
};

export default Label;
