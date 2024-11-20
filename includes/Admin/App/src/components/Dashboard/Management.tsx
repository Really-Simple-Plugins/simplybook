import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";

const Management = () => {
  return (
    <Block className={"col-span-3 row-span-2"}>
      <BlockHeading
        title={__("Management", "simplybook")}
        controls={undefined}
      />
      <BlockContent>{""}</BlockContent>
      <BlockFooter>{""}</BlockFooter>
    </Block>
  );
};

Management.displayName = "Management";
export default Management;
