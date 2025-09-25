import { GitCompareArrows } from "lucide-react";
import TooltipButton from "./TooltipButton";

const CompareButton = () => (
  <TooltipButton icon={GitCompareArrows} label="Compare" onClick={() => console.log("Compare clicked ✅")} delay={200} />
);

export default CompareButton;
