import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import { Link } from "@tanstack/react-router";
import Icon from "../Common/Icon";
import useOtherPluginsData from "../../hooks/useOtherPluginsData";
import React from "react";

const OurPlugins = () => {
    const {plugins, fetched, runPluginAction, pluginActionNice} = useOtherPluginsData();
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
            plugins && plugins.length>0 && plugins.map((plugin) => (
                <div key={plugin.url} className={"flex items-center gap-2 text-sm w-full py-2 "}>
                    <Icon name={"circle"} color={plugin.color}/>
                    <Link to={plugin.url}>
                        {plugin.title}
                    </Link>
                    <div className={"text-sm ml-auto"}>
                        <a href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => runPluginAction({
                            slug: plugin.slug,
                            action: plugin.action,
                            e
                        })}>
                            {pluginActionNice(plugin.action)}
                        </a>
                    </div>
                </div>
            ))}
      </BlockContent>
        <BlockFooter>{""}</BlockFooter>
    </Block>
  );
};

OurPlugins.displayName = "OurPlugins";
export default OurPlugins;
