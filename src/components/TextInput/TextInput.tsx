import React from "react";

function TextInput(props: React.ComponentPropsWithoutRef<"input">) {
    return (
        <input
            className={[
                `bg-black-100
                rounded-[0.15em] px-2 py-[0.25rem] 
                shadow-[0_0_0_1px]
                shadow-black-300 
                transition-shadow
                focus:shadow-[0_0_0_3px] 
                focus:shadow-blue-400 
                focus:outline-none`,
                props.className ?? "",
            ].join(" ")}
            {...props}
        />
    );
}

export default TextInput;
