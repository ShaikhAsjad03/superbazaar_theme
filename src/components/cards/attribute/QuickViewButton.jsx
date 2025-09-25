import { ScanEye } from "lucide-react";
import TooltipButton from "./TooltipButton";

const QuickViewButton = () => (
  <TooltipButton icon={ScanEye} label="Quick View" onClick={() => console.log("Quick View clicked ✅")} delay={100} />
);

export default QuickViewButton;
