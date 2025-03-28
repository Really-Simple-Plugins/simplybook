import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import {__} from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import Tip from "./Partials/Tip";
import {useQuery} from "@tanstack/react-query";
import HttpClient from "../../api/requests/HttpClient";

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
        <Block className={"col-span-6 row-span-1"}>
            <BlockHeading
                title={__("Tips & Tricks", "simplybook")}
                controls={undefined}
            />
            <BlockContent>
                {loadingCompleted && (
                    data.data.items.map((item: any, i: number) => (
                        <Tip key={`trick-${i}`} title={item.title} link={item.link} content={item.content} />
                    ))
                )}
            </BlockContent>
            <BlockFooter>
                {isLoading && (
                    <div><p>{__("Loading...", "simplybook")}</p></div>
                )}

                {loadingCompleted && (<>
                    <a href={data?.data.all ?? '#'} target="_blank" rel="noopener noreferrer" className="simplybook-tips-tricks-all">{__("View All", "simplybook")}</a>
                    <a href={data?.data.video_tutorials ?? '#'} target="_blank" rel="noopener noreferrer" className="simplybook-tips-tricks-all">{__("Video tutorials", "simplybook")}</a>
                </>)}
            </BlockFooter>
        </Block>
    );
};

TipsTricks.displayName = "TipsTricks";
export default TipsTricks;