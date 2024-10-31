import {createLazyFileRoute} from '@tanstack/react-router'
import {__} from '@wordpress/i18n'
import {useState} from "react";
import Header from "../components/Common/Header.jsx";
import Block from "../components/Blocks/Block.jsx";
import BlockContent from "../components/Blocks/BlockContent.jsx";
import BlockHeading from "../components/Blocks/BlockHeading.jsx";
import BlockFooter from "../components/Blocks/BlockFooter.jsx";



export const Route = createLazyFileRoute('/')({
    component: Dashboard,
})

function Dashboard() {
    return (
        <>
            <Header/>
            <div className="flex mx-auto max-w-screen-2xl">
                <div className="grid grid-cols-12 grid-rows-5 gap-5 w-full min-h-full m-5">
                    <Block
                        colSpan={6}
                        rowSpan={3}
                    >
                        <BlockHeading title={__('Welcome', 'simplybook')} controls={null}/>
                        <BlockContent>
                            Content
                        </BlockContent>
                        <BlockFooter>
                            Footer
                        </BlockFooter>
                    </Block>
                    <Block
                        colSpan={6}
                        rowSpan={3}
                    >
                        <BlockHeading title={__('Welcome', 'simplybook')} controls={null}/>
                        <BlockContent>
                            Content
                        </BlockContent>
                        <BlockFooter>
                            Footer
                        </BlockFooter>
                    </Block>
                </div>
            </div>
        </>
    )
}