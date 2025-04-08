import { memo } from "react";
import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import BlockContent from "../Blocks/BlockContent";
import FormFieldWrapper from "../Forms/FormFieldWrapper";
import BlockFooter from "../Blocks/BlockFooter";
import PreviewButtonInput from "../Inputs/PreviewButton";

const SettingsGroupBlock = memo(
    ({ group, currentGroupFields, control, isLastGroup, formHasSettings, getValues, reset }) => {
        const className = isLastGroup && formHasSettings ? "rounded-b-none" : "mb-5";

        return (
            <Block key={group.id} className={className}>
                <BlockHeading title={group.title} help={group?.help ?? ''}/>
                <BlockContent>
                    <div className="flex flex-wrap justify-between gap-4">
                        <FormFieldWrapper fields={currentGroupFields} control={control} getValues={getValues} reset={reset}/>
                    </div>
                </BlockContent>
                {group.has_preview && (
                    <BlockFooter className="rounded-xl bg-gray-50">
                        <PreviewButtonInput btnVariant="tertiary" getValues={getValues}></PreviewButtonInput>
                    </BlockFooter>
                )}
            </Block>
        );
    },
);

SettingsGroupBlock.displayName = 'SettingsGroupBlock';

export default SettingsGroupBlock;