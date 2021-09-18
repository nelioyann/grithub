import React, {createContext, useEffect, useState} from "react"

export interface DarkModeContextProps {
    darkMode: boolean;
    darkModeSet:React.Dispatch<React.SetStateAction<boolean>>;
}


export const DarkModeContext = createContext({} as DarkModeContextProps)

const DarkModeContextProvider:React.FC = (props) =>{
    const [darkMode, darkModeSet] = useState(false);
    
    const defaultThemeMode: DarkModeContextProps = {
        darkMode: darkMode, darkModeSet: darkModeSet
    }

    useEffect(() => {
            // Listen for the toggle check/uncheck to toggle the dark class on the <body>
            document.body.classList.toggle('dark', darkMode);
            darkModeSet(darkMode)
    
    }, [])
    return(
        <DarkModeContext.Provider value={defaultThemeMode}>
            {props.children}
        </DarkModeContext.Provider>
    )
}

export default DarkModeContextProvider;