import { toast } from 'react-toastify';
import Icon from '../Common/Icon';

/**
 * ToastNotice class. Can be used to create a toast notice with a message and an
 * icon. If one instance of the class is created, it can be used to create
 * multiple toasts. This is done by the cleanUp method, which resets the
 * message and type after rendering the toast.
 */
class ToastNotice {
    private message:string | undefined;
    private type:string | undefined;

    /**
     * Constructor for the ToastNotice class
     * @param message - The message to display in the toast
     * @param type - The type of the toast. Can be "success", "error" or "warning"
     */
    constructor(message?:string, type?:string) {
        this.type = type;
        this.message = message;
    }

    /**
     * Set the type of the toast. Can be "success", "error" or "warning".
     */
    public setType(type:string | undefined): ToastNotice
    {
        this.type = type;
        return this;
    }

    /**
     * Set the message to display
     */
    public setMessage(message:string | undefined): ToastNotice
    {
        this.message = message;
        return this;
    }

    /**
     * Render the toast depending on the type
     */
    public render() {

        if(this.type === "success") {
            toast(this.createToast(
                this.message,
                "circle-check",
                "green"
            ));
        }

        if (this.type === "error") {
            toast(this.createToast(
                this.message,
                "circle-xmark",
                "red"
            ));
        }

        if (this.type === "warning") {
            toast(this.createToast(
                this.message,
                "warning",
                "var(--color-warning)"
            ));
        }

        if (!this.type) {
            console.error("ToastNotice: No type has been defined, aborted.");
        }

        this.cleanUp();
    }

    /**
     * Create the toast
     * @param message - The message to display
     * @param icon - The icon to display
     * @param iconColor - The color of the icon
     * @returns
     */
    private createToast(
        message?:string,
        icon?:string,
        iconColor?:string
    ) {
        if (!message || !icon || !iconColor) {
            return <></>;
        }

        return (
            <>
                <div className='flex items-center gap-2'>
                    <Icon
                        className="h-5"
                        name={icon}
                        color={iconColor}
                        size="2x" />
                    <p className='text-black font-normal text-[0.85rem] m-0'>
                        {message}
                    </p>
                </div>
            </>
        );
    }

    /**
     * Clean up the toast. Method is used to reset the message and type after
     * rendering the toast. Useful in components where the toast is rendered
     * multiple times based on one instance of the class.
     */
    private cleanUp() {
        this.message = "No notice message has been defined";
        this.type = "warning";
    }

}

export default ToastNotice;