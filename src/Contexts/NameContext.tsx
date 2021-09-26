import React, {createContext, useState, useEffect} from "react"
import { useAuth } from "./authProvider";
import { firebaseStore } from "../initFirebase";


export interface NameContextProps {
    name: string;
    nameSet:React.Dispatch<React.SetStateAction<string>>;

}


export const NameContext = createContext({} as NameContextProps)

const NameContextProvider:React.FC = (props) =>{
    const [name, nameSet] = useState("Grithuber");
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
                  console.log("name context",snapshot.data()?.username)
                  nameSet(snapshot.data()?.username)
              });
            return () => {
              console.log("unsubcribe name");
              unsubscribe();
            };
          } catch (e) {
            console.log("e.message");
          }
          console.log("finally")
          

    }, [user])
    return(
        <NameContext.Provider value={defaultName}>
            {props.children}
        </NameContext.Provider>
    )
}

export default NameContextProvider;