import React from "react";

interface Props {
    className?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

function BlendedTextInput({
    className = "",
    value,
    onChange,
    onBlur,
    ...props
}: Props & React.ComponentPropsWithoutRef<"input">) {
    return (
        <input
            {...props}
            className={`max-h-fit max-w-fit ${className}`}
            type="text"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
}

export default BlendedTextInput;
