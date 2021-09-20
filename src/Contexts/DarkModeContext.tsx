import React, { createContext, useContext, useEffect, useState } from "react"
// import { StatusBar, Style } from '@capacitor/status-bar';

export interface DarkModeContextProps {
    darkMode: boolean;
    darkModeSet: React.Dispatch<React.SetStateAction<boolean>>;
}


export const DarkModeContext = createContext({} as DarkModeContextProps)

function useDarkMode() {
    return useContext(DarkModeContext)
}


const DarkModeContextProvider: React.FC = (props) => {
    const [darkMode, darkModeSet] = useState(false);

    const defaultThemeMode: DarkModeContextProps = {
        darkMode: darkMode, darkModeSet: darkModeSet
    }

    useEffect(() => {
        // Listen for the toggle check/uncheck to toggle the dark class on the <body>
        document.body.classList.toggle('dark', darkMode);
        // if(!darkMode) StatusBar.setStyle({ style: Style.Light });
        // if(darkMode) StatusBar.setStyle({ style: Style.Dark });
        darkModeSet(darkMode)

    }, [])
    return (
        <DarkModeContext.Provider value={defaultThemeMode}>
            {props.children}
        </DarkModeContext.Provider>
    )
}

export { useDarkMode, DarkModeContextProvider };