import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import { Link } from "@tanstack/react-router";
import Icon from "../Common/Icon";
import useOtherPluginsData from "../../hooks/useOtherPluginsData";
import React from "react";
import { OtherPlugin } from "../../types/OtherPlugin";
import rspLogo from "../../assets/svg/really-simple-plugins-logo.svg";

const OurPlugins = () => {
    const {plugins, fetched, runPluginAction, pluginActionNice} = useOtherPluginsData();

  return (
    <>
        <Block className={"col-span-12 sm:col-span-6 2xl:col-span-6 2xl:row-span-2 xl:col-span-6 !bg-transparent shadow-none"}>
            <div className="flex justify-between items-center">
                <BlockHeading
                title={__("Our Plugins", "simplybook")}
                controls={undefined}
                />
                <img className="w-[200px]" src={rspLogo} alt="Really Simple Plugins" />
            </div>
        {/* align list in middle of block */}
            <BlockContent className={"flex flex-col items-center px-4"}>
                {// @ts-ignore
                    fetched && plugins && Object.keys(plugins).length && Object.values(plugins).map((plugin: OtherPlugin) => (
                        <div key={plugin.url} className={"flex items-center gap-2 text-sm w-full mb-2 xl:flex-wrap"}>
                            <Icon name={"circle"} color={plugin.color}/>
                            <Link 
                                className="text-black font-semibold"
                                to={plugin.url}>
                                {plugin.title}
                            </Link>
                            <div className={"flex text-black underline text-sm"}>
                                {plugin.action === 'installed' && pluginActionNice(plugin.action)}
                                {plugin.action !== 'installed' && <>
                                    <a 
                                        className="text-black"
                                        target="_blank" 
                                        href={plugin.action !== 'upgrade-to-premium' ? '#' : plugin.url}
                                    onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => runPluginAction({
                                        slug: plugin.slug,
                                        action: plugin.action,
                                        e
                                    })}>
                                        {pluginActionNice(plugin.action)}
                                    </a>
                                </>
                                }
                            </div>
                        </div>
                    ))}
            </BlockContent>
            <BlockFooter>
                {!fetched && (
                    <div><p>{__("Loading...", "simplybook")}</p></div>
                )}
            </BlockFooter>
        </Block>
    </>
  );
};

OurPlugins.displayName = "OurPlugins";
export default OurPlugins;