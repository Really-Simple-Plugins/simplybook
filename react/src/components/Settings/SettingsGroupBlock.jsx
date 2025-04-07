import { memo } from "react";
import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import BlockContent from "../Blocks/BlockContent";
import FormFieldWrapper from "../Forms/FormFieldWrapper";

const SettingsGroupBlock = memo(
    ({ group, currentGroupFields, control, isLastGroup, formHasSettings }) => {
        const className = isLastGroup && formHasSettings ? "rounded-b-none" : "mb-5";

        return (
            <Block key={group.id} className={className}>
                <BlockHeading title={group.title} help={group?.help ?? ''}/>
                <BlockContent>
                    <div className="flex flex-wrap">
                        <FormFieldWrapper fields={currentGroupFields} control={control}/>
                    </div>
                </BlockContent>
            </Block>
        );
    },
);

SettingsGroupBlock.displayName = 'SettingsGroupBlock';

export default SettingsGroupBlock;