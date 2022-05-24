import React, {createContext, useState, useEffect, useContext} from "react"
import { useAuth } from "./authProvider";
import { firebaseStore } from "../initFirebase";


export interface NameContextProps {
    name: string;
    nameSet:React.Dispatch<React.SetStateAction<string>>;

}

function useUsername(){
  return useContext(NameContext)
}

export const NameContext = createContext({} as NameContextProps)

const NameContextProvider:React.FC = (props) =>{
    const [name, nameSet] = useState("");
    const { user, loading } = useAuth();

    
    const defaultName: NameContextProps = {
        name: name, nameSet: nameSet
    }


    useEffect(() => {
        try {
            // If there is no user don't listen for data
            if (user === null) {
              // console.log("No user");
              return;
            }
            const unsubscribe = firebaseStore
              .collection("users")
              .doc(user!.uid)
              .onSnapshot((snapshot) => {
                  nameSet(snapshot.data()?.username || "Nameless Griter")
              });
            return () => {
              unsubscribe();
            };
          } catch (e) {
            console.log("e.message");
          }
          

    }, [user])
    return(
        <NameContext.Provider value={defaultName}>
            {props.children}
        </NameContext.Provider>
    )
}

export {useUsername, NameContextProvider};