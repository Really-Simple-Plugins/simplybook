import { memo } from "react";
import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import BlockContent from "../Blocks/BlockContent";
import FormFieldWrapper from "../Forms/FormFieldWrapper";
import BlockFooter from "../Blocks/BlockFooter";
import PreviewButtonInput from "../Inputs/PreviewButton";
import clsx from "clsx";

const SettingsGroupBlock = memo(
    ({ group, currentGroupFields, control, isLastGroup, formHasSettings, getValues, setValue, reset }) => {
        const className = isLastGroup && formHasSettings ? "rounded-b-none" : "mb-5";

        return (
            <Block key={group.id} className={clsx(className, "")}>
                <BlockHeading className="mb-[0.70rem]" title={group.title} help={group?.help ?? ''}/>
                <BlockContent className="px-4">
                    <div className="flex flex-wrap justify-between">
                        <FormFieldWrapper fields={currentGroupFields} control={control} getValues={getValues} setValue={setValue} reset={reset}/>
                    </div>
                </BlockContent>
            </Block>
        );
    },
);

SettingsGroupBlock.displayName = 'SettingsGroupBlock';

export default SettingsGroupBlock;