import React from "react";

function TextInput(props: React.ComponentPropsWithoutRef<"input">) {
    return (
        <input
            className={[
                "rounded-[0.25em] p-2.5 shadow-[0_0_0_1px] shadow-blue-600 transition-shadow focus:shadow-[0_0_0_2px] focus:shadow-blue-800 focus:outline-none",
                props.className ?? "",
            ].join(" ")}
            {...props}
        />
    );
}

export default TextInput;
