import {createLazyFileRoute} from '@tanstack/react-router'
import {__} from '@wordpress/i18n'
import {useState} from "react";
import BlockHeading from "../components/Block/BlockHeading";
import Header from "../components/Header";

export const Route = createLazyFileRoute('/')({
    component: Dashboard,
})

function Dashboard() {
    return (
        <>
            <Header/>
            <div className="flex mx-auto max-w-screen-xl py-5">
                <div className="grid grid-cols-12 grid-rows-5 gap-5 w-full min-h-full">
                    <ProgressBlock/>
                    <div className="bg-white shadow-md rounded-md col-span-3 row-span-3">
                        <BlockHeading title={__('Bookings', 'simplybook')} controls={null}/>
                    </div>
                    <div className="bg-white shadow-md rounded-md col-span-3 row-span-3">
                        <BlockHeading title={__('Management', 'simplybook')} controls={null}/>
                    </div>
                    <div className="bg-white shadow-md rounded-md col-span-6 row-span-2">
                        <BlockHeading title={__('Tips & Tricks', 'simplybook')} controls={null}/>
                    </div>
                    <div className="col-span-6 row-span-2">
                        <BlockHeading title={__('Our plugins', 'simplybook')} controls={null}/>
                    </div>
                </div>
            </div>
        </>
    )
}


const ProgressContent = () => {
    return (
        <div className="flex justify-between items-center px-5">
            <div className="flex flex-col">
                <p className="text-sm text-gray-500">Total bookings</p>
                <p className="text-2xl font-bold">0</p>
            </div>
            <div className="flex flex-col">
                <p className="text-sm text-gray-500">Total revenue</p>
                <p className="text-2xl font-bold">0</p>
            </div>
            <div className="flex flex-col">
                <p className="text-sm text-gray-500">Total clients</p>
                <p className="text-2xl font-bold">0</p>
            </div>
        </div>
    )
}

const ProgressBlock = () => {
    const [ProgressStatus, setProgressStatus] = useState(null);
    return (
        <div className="bg-white shadow-md rounded-md col-span-6 row-span-3">
            <BlockHeading title={__('Progress', 'simplybook')} controls={null}/>
            <ProgressContent ProgressStatus={ProgressStatus}/>
        </div>
    )
}
