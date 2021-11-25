import React, { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./authProvider";
import { firebaseStore } from "../initFirebase";

// import { StatusBar, Style } from '@capacitor/status-bar';

export interface DarkModeContextProps {
    darkMode: boolean;
    darkModeSet: React.Dispatch<React.SetStateAction<boolean>>;
    handleDarkMode: (checked: boolean) => void;
}


export const DarkModeContext = createContext({} as DarkModeContextProps)

function useDarkMode() {
    return useContext(DarkModeContext)
}


const DarkModeContextProvider: React.FC = (props) => {
    const { user, setLoading } = useAuth();

    const [darkMode, darkModeSet] = useState<boolean>(false);

    

    async function handleDarkMode(checked: boolean) {
      // Listen for the toggle check/uncheck to toggle the dark class on the <body>
      if (checked === undefined) return;
      
      document.body.classList.toggle("dark", checked);
      let result = await firebaseStore
        .collection("users")
        .doc(user!.uid)
        .set({ darkMode: checked }, { merge: true });
      console.log(result);
      // darkModeSet(checked)
    }


    const defaultThemeMode: DarkModeContextProps = {
      darkMode: darkMode, darkModeSet: darkModeSet, handleDarkMode: handleDarkMode
  }

    useEffect(()=>{
      setLoading(true)
        // Listen for the toggle check/uncheck to toggle the dark class on the <body>
        document.body.classList.toggle('dark', darkMode);
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", darkMode ? "#000000" : "#ffffff");
        // console.log("Effect dark mode", darkMode);
        setLoading(false)
    }, [darkMode])

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
                  darkModeSet(snapshot.data()?.darkMode === undefined ? false : snapshot.data()?.darkMode)
              });
            return () => {
              unsubscribe();
            };
          } catch (e) {
            console.log("e.message");
          }
          

    }, [user])
    return (
        <DarkModeContext.Provider value={defaultThemeMode}>
            {props.children}
        </DarkModeContext.Provider>
    )
}

export { useDarkMode, DarkModeContextProvider };