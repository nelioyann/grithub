import React, { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./authProvider";
import { firebaseStore } from "../initFirebase";

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
    const { user, loading } = useAuth();

    const [darkMode, darkModeSet] = useState<boolean>(true);

    const defaultThemeMode: DarkModeContextProps = {
        darkMode: darkMode, darkModeSet: darkModeSet
    }

    useEffect(()=>{
        // Listen for the toggle check/uncheck to toggle the dark class on the <body>
        document.body.classList.toggle('dark', darkMode);
        console.log("Effect dark mode")
    }, [darkMode])

    useEffect(() => {
        // if(!darkMode) StatusBar.setStyle({ style: Style.Light });
        // if(darkMode) StatusBar.setStyle({ style: Style.Dark });
        // darkModeSet(darkMode)


        try {
            // If there is no user don't listen for data
            if (user === null) {
              // console.log("No user");
              return;
            }
            // console.log("does it exist ?", firebaseStore.collection("users")
            //     .doc(user!.uid).collection("habits").get())
            const unsubscribe = firebaseStore
              .collection("users")
              .doc(user!.uid)
              .onSnapshot((snapshot) => {
                  console.log("darkmode context",snapshot.data()?.darkMode)
                  darkModeSet(snapshot.data()?.darkMode)
              });
                console.log("loading falsed");
            // setLoadingHabits(false);
      
            return () => {
              console.log("unsubcribe habits");
              unsubscribe();
            };
          } catch (e) {
            console.log("e.message");
          }
          console.log("finally")
          

    }, [user])
    return (
        <DarkModeContext.Provider value={defaultThemeMode}>
            {props.children}
        </DarkModeContext.Provider>
    )
}

export { useDarkMode, DarkModeContextProvider };