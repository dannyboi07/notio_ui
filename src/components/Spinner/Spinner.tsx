import { Oval } from "react-loader-spinner";
import { slate } from "tailwindcss/colors";

interface SpinnerProps {
    width?: string | number;
    height?: string | number;
    strokeWidth?: number;
    strokeWidthSecondary?: number;
    variant?: "primary" | "secondary";
}

function Spinner({
    width = "1rem",
    height = "1rem",
    strokeWidth = 4,
    strokeWidthSecondary = 4,
    variant = "primary",
}: SpinnerProps) {
    return (
        <Oval
            width={width}
            height={height}
            strokeWidth={strokeWidth}
            strokeWidthSecondary={strokeWidthSecondary}
            color={variant === "primary" ? slate[900] : slate[50]}
            secondaryColor={variant === "primary" ? slate[50] : slate[600]}
        />
    );
}

export default Spinner;
