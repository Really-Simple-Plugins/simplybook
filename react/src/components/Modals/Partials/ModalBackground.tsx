import React from "react";

interface ModalBackgroundProps {
    image?: string,
    color?: string,
}

const ModalBackground: React.FC<ModalBackgroundProps> = ({ image, color })=> {
    if (!(color || image)) {
        return null;
    }

    const modalBackgroundStyle =
        image ? { background: `no-repeat center/150% url(${image})` }
        : color && { backgroundColor: color };

    return (
        <div className="modal-background absolute inset-0 -z-1"
             style={{ ...modalBackgroundStyle }}>
        </div>
    );
}

ModalBackground.displayName = "ModalBackground";

export default ModalBackground;