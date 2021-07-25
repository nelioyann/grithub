import React, {createContext, useState} from "react"

export interface NameContextProps {
    name: string;
    nameSet:React.Dispatch<React.SetStateAction<string>>;

}


export const NameContext = createContext({} as NameContextProps)

const NameContextProvider:React.FC = (props) =>{
    const [name, nameSet] = useState("Grithuber");
    
    const defaultName: NameContextProps = {
        name: name, nameSet: nameSet
    }

    return(
        <NameContext.Provider value={defaultName}>
            {props.children}
        </NameContext.Provider>
    )
}

export default NameContextProvider;