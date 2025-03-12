import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";

const Tip = ({link, content}: {link: string, content: string}) => {
    return (
        <div className="simplybook-tips-tricks-element">
            <a href={link} target="_blank" rel="noopener noreferrer" title={content}>
                <div className="simplybook-icon">
                    <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="15">
                        <path fill="var(--rsp-grey-300)" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/>
                    </svg>
                </div>
                <div className="simplybook-tips-tricks-content">{content}</div>
            </a>
        </div>
    )
}

const TipsTricks = () => {
  return (
    <Block className={"col-span-6 row-span-1"}>
      <BlockHeading
        title={__("Tips & Tricks", "simplybook")}
        controls={undefined}
      />
      <BlockContent>
          {/* Typescript does not recognise global variable simplybook
          @ts-ignore*/}
          {simplybook.tips_and_tricks.items.map((item, i) => <Tip key={`trick-${i}`} link={item.link} content={item.content} /> ) }
      </BlockContent>
      <BlockFooter>
          {/* Typescript does not recognise global variable simplybook
          @ts-ignore*/}
          <a href={simplybook.tips_and_tricks.all} target="_blank" rel="noopener noreferrer" className="simplybook-tips-tricks-all">{__("View All", "simplybook")}</a>

          {/* Typescript does not recognise global variable simplybook
          @ts-ignore*/}
          <a href={simplybook.tips_and_tricks.video_tutorials} target="_blank" rel="noopener noreferrer" className="simplybook-tips-tricks-all">{__("Video tutorials", "simplybook")}</a>
      </BlockFooter>
    </Block>
  );
};

TipsTricks.displayName = "TipsTricks";
export default TipsTricks;