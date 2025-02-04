import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import { Link } from "@tanstack/react-router";
import Icon from "../Common/Icon";
import useOtherPluginsData from "../../hooks/useOtherPluginsData";

const OurPlugins = () => {
    const {plugins, fetched} = useOtherPluginsData();
    console.log("OurPlugins", plugins);
  return (
    <Block className={"col-span-6 row-span-1 bg-transparent shadow-none"}>
      <BlockHeading
        title={__("Our Plugins", "simplybook")}
        controls={undefined}
      />
      {/* align list in middle of block */}
      <BlockContent className={"flex flex-col items-center"}>
        {// @ts-ignore
            fetched && plugins.map((plugin) => (
          <div key={plugin.url} className={"flex items-center gap-2 text-sm w-full py-2 "}>
            <Icon name={"circle"} className={"text-green-500"} />
            <Link to={plugin.url}>
              {plugin.title}
            </Link>
            <div className={"text-sm ml-auto"}>{plugin.action}</div>
          </div>
        ))}
      </BlockContent>
      <BlockFooter>{""}</BlockFooter>
    </Block>
  );
};

OurPlugins.displayName = "OurPlugins";
export default OurPlugins;
