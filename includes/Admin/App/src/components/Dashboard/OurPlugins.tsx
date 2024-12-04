import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import { Link } from "@tanstack/react-router";
import Icon from "../Common/Icon";

const pluginsData = [
  {
    url: "https://wordpress.org/plugins/really-simple-ssl/",
    name: "Really Simple Security",
    tagline: "Lightweight plugin. Heavyweight security features.",
  },
  {
    url: "https://wordpress.org/plugins/complianz/",
    name: "Complianz",
    tagline: "Cookie Consent Management as it should be",
  },
  {
    url: "https://wordpress.org/plugins/burst-statistics/",
    name: "Burst Statistics",
    tagline: "Privacy-friendly Analytics made Simple",
  },
];

const OurPlugins = () => {
  return (
    <Block className={"col-span-6 row-span-1 bg-transparent shadow-none"}>
      <BlockHeading
        title={__("Our Plugins", "simplybook")}
        controls={undefined}
      />
      {/* align list in middle of block */}
      <BlockContent className={"flex flex-col items-center"}>
        {pluginsData.map((plugin) => (
          <div key={plugin.url} className={"flex items-center gap-2 text-sm w-full py-2 "}>
            <Icon name={"circle"} className={"text-green-500"} />
            <Link to={plugin.url}>
              {__(plugin.name, "simplybook")} - {__(plugin.tagline, "simplybook")}
            </Link>
            <div className={"text-sm ml-auto"}>{__("Install", "simplybook")}</div>
          </div>
        ))}
      </BlockContent>
      <BlockFooter>{""}</BlockFooter>
    </Block>
  );
};

OurPlugins.displayName = "OurPlugins";
export default OurPlugins;
