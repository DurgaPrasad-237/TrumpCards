import {create} from "zustand";

export const useThemeStore = create((set) =>({
    theme:localStorage.getItem("trumpcard-theme") || "sunset",
    setTheme:(theme) => {
        localStorage.setItem("trumpcard-theme",theme);
        set({theme});
    },
}))