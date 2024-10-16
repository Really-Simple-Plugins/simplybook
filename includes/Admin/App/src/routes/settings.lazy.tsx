import {
    createLazyFileRoute,
    Link,
    Outlet,
    useNavigate,
} from '@tanstack/react-router'
import {__} from '@wordpress/i18n'
import BlockHeading from '../components/Blocks/BlockHeading.jsx'
import Header from "../components/Header";
import Block from "../components/Blocks/Block";

export const Route = createLazyFileRoute('/settings')({
    component: Settings,
})

function Settings() {
    const linkClassName =
        'py-2 px-5 border-l-4  border-transparent [&.active]:border-blue-500 focus:outline-none'
    const navigate = useNavigate({from: '/settings'})

    return (
        <>
            <Header/>
            <div className="flex mx-auto max-w-screen-2xl">
                <div className="grid grid-cols-12 grid-rows-5 gap-5 w-full min-h-full m-5">
                    <Block colSpan={3} rowSpan={4}>
                        <BlockHeading title={__('Settings', 'simplybook')} controls={null}/>
                        <div className="flex flex-col justify-start">
                            <Link to="/settings/general" className={linkClassName}>
                                {__('General', 'simplybook')}
                            </Link>
                            <Link to="/settings/providers" className={linkClassName}>
                                {__('Providers', 'simplybook')}
                            </Link>
                            <Link to="/settings/services" className={linkClassName}>
                                {__('Services', 'simplybook')}
                            </Link>
                            <Link to="/settings/design" className={linkClassName}>
                                {__('Design', 'simplybook')}
                            </Link>
                            <Link to="/settings/notifications" className={linkClassName}>
                                {__('Notifications', 'simplybook')}
                            </Link>
                            <Link to="/settings/custom" className={linkClassName}>
                                {__('Custom', 'simplybook')}
                            </Link>
                            <Link to="/settings/schedule" className={linkClassName}>
                                {__('Schedule', 'simplybook')}
                            </Link>
                            <a href={'https://simplybook.me'} className={linkClassName}>
                                {__('Bookings', 'simplybook')} (O)
                            </a>
                    </div>
                    </Block>
                    <div className="col-span-6  row-span-4">
                        <Outlet/>
                    </div>
                    <div className="col-span-3 rounded-md row-span-4">
                        Hello from settings!
                    </div>
                </div>
            </div>
        </>
    )
}
