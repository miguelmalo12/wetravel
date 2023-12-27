import { useState } from "react";

export const useFocusHandlers = () => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return { isFocused, handleFocus, handleBlur };
};
