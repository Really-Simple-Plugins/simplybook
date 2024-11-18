import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";

const TipsTricks = () => {
  return (
    <Block className={"col-span-6 row-span-1"}>
      <BlockHeading
        title={__("Tips & Tricks", "simplybook")}
        controls={undefined}
      />
      <BlockContent>{""}</BlockContent>
      <BlockFooter>{""}</BlockFooter>
    </Block>
  );
};

TipsTricks.displayName = "TipsTricks";
export default TipsTricks;
