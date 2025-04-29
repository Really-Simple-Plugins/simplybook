import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import {__} from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import Tip from "./Partials/Tip";
import {useQuery} from "@tanstack/react-query";
import HttpClient from "../../api/requests/HttpClient";
import ButtonLink from "../Buttons/ButtonLink";

const TipsTricks = () => {

    const route = 'tips_and_tricks';
    const client = new HttpClient(route);

    const {isLoading, error, data} = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
    });

    let loadingCompleted = (
        !isLoading && !error && data?.data && data.data.items
    );

    return (
        <Block className={"col-span-12 sm:col-span-6 2xl:col-span-6 2xl:row-span-2 xl:col-span-6"}>
            <BlockHeading
                title={__("Tips & Tricks", "simplybook")}
                controls={undefined}
            />
            <BlockContent className="px-4 flex items-center">
                <div className="flex flex-col justify-start gap-x-4">
                    {loadingCompleted && (
                        data.data.items.map((item: any, i: number) => (
                            <Tip className="mb-2 w-[48%]" key={`trick-${i}`} title={item.title} link={item.link} content={item.content} />
                        ))
                    )}
                </div>
            </BlockContent>
            <BlockFooter className="pt-2">
                <ButtonLink 
                    reverseIcon={true}
                    iconName="target-blank"
                    className={"border-sb-blue text-sb-blue"} 
                    link={'https://help.simplybook.me/index.php/Help_Center'} 
                    target="_blank"
                    btnVariant={"square-ghost-small"}
                >
                    {__("View All", "simplybook")}
                </ButtonLink>
            </BlockFooter>
        </Block>
    );
};

TipsTricks.displayName = "TipsTricks";
export default TipsTricks;