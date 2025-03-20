import React from "react";
import clsx from "clsx";

const VideoFrame = ({
    FrameWrapperClass,
    className,
    children,
    title,
    src,
    allow,
    refPolicy
}) => {
    return (
    <>        
        <div className={clsx(FrameWrapperClass, "FrameWrapper")}>
            <iframe
                className={className}
                src={src}
                title={title}
                allow={allow}
                referrerPolicy={refPolicy}
            ></iframe>
        </div>
    </>
    );
};

VideoFrame.displayName = "VideoFrame"

export default VideoFrame;