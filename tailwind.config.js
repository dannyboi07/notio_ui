const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                black: {
                    // Black
                    900: colors.neutral[900],
                    700: colors.neutral[700],
                    // Ex. Login email field's font colour
                    400: colors.stone[400],
                    // Ex. Login email field's bg colour
                    300: colors.stone[300],
                    200: colors.stone[200],
                    100: colors.stone[100],
                },
                blue: {
                    100: "#caf0f8",
                    200: "#ade8f4",
                    300: "#90e0ef",
                    // Ex. Login email field's focus border colour
                    // 400: "#48cae4",
                    400: colors.sky[400],
                    500: "#00b4d8",
                    // 500: colors.sky[500],
                    600: "#0096c7",
                    700: "#0077b6",
                    800: "#023e8a",
                    900: "#03045e",
                },
                olive: {
                    900: "#283618",
                    700: "#606c38",
                },
                brown: {
                    700: "#bc6c25",
                    400: "#dda15e",
                    200: "#fefae0",
                },
            },
        },
        fontFamily: {
            sans: ["Nunito Sans", "sans"],
            // sans: ["Merriweather Sans", "sans"],
            // sans: ["Raleway", "sans"],
        },
        keyframes: {
            toastHide: {
                from: { opacity: 1 },
                to: { opacity: 0 },
            },
            toastSlideIn: {
                from: {
                    transform:
                        "translateX(calc(100% + var(--viewport-padding)))",
                },
                to: { transform: "translateX(0)" },
            },
            toastSwipeOut: {
                from: {
                    transform: "translateX(var(--radix-toast-swipe-end-x))",
                },
                to: {
                    transform:
                        "translateX(calc(100% + var(--viewport-padding)))",
                },
            },
        },
        animation: {
            toastHide: "toastHide 100ms ease-in",
            toastSlideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
            toastSwipeOut: "toastSwipeOut 100ms ease-out",
        },
    },
    plugins: [],
};
