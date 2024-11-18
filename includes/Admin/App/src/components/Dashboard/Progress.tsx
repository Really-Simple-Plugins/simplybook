import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";

const Progress = () => {
  return (
    <Block className={"col-span-6 row-span-2"}>
      <BlockHeading title={__("Progress", "simplybook")} controls={undefined} />
      <BlockContent>{""}</BlockContent>
      <BlockFooter>{""}</BlockFooter>
    </Block>
  );
};

Progress.displayName = "Progress";
export default Progress;
