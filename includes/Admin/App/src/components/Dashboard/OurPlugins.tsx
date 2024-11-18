import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";

const OurPlugins = () => {
  return (
    <Block className={"col-span-6 row-span-1 bg-transparent shadow-none"}>
      <BlockHeading
        title={__("Our Plugins", "simplybook")}
        controls={undefined}
      />
      <BlockContent>{""}</BlockContent>
      <BlockFooter>{""}</BlockFooter>
    </Block>
  );
};

OurPlugins.displayName = "OurPlugins";
export default OurPlugins;
