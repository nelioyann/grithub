import React, {createContext, useState} from "react"

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

    return(
        <DarkModeContext.Provider value={defaultThemeMode}>
            {props.children}
        </DarkModeContext.Provider>
    )
}

export default DarkModeContextProvider;