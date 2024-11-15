import { memo } from "react";
import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import BlockContent from "../Blocks/BlockContent";
import FormField from "../Forms/FormField";

const SettingsGroupBlock = memo(
  ({ group, currentGroupFields, control, isLastGroup }) => {
    const className = isLastGroup ? "rounded-b-none" : "mb-5";

    return (
      <Block key={group.id} className={className}>
        <BlockHeading title={group.title} />
        <BlockContent>
          <div className="flex flex-wrap">
            {currentGroupFields.map((field) => (
              <FormField setting={field} key={field.id} control={control} />
            ))}
          </div>
        </BlockContent>
      </Block>
    );
  },
);

export default SettingsGroupBlock;
