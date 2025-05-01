import { toast } from 'react-toastify';
import Icon from '../Common/Icon';

class ToastNotice {
    private message:string | undefined;
    private type:string | undefined;

    constructor(message?:string, type?:string) {
        this.type = type;
        this.message = message;
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

    public setType(type:string | undefined) {
        this.type = type;
        return this;
    }

    public setMessage(message:string | undefined) {
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

        this.cleanUp();
    }

    private cleanUp() {
        this.message = "No notice message has been defined";
        this.type = "warning";
    }

}

export default ToastNotice;