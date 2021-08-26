import { createContext, useEffect, useState, useContext } from "react"
import { firebase, firebaseAuth } from "../initFirebase"

interface IContext {
    user: firebase.User | null;
    loading: boolean;
    logout: () => void;
}

const AuthContext = createContext<IContext>({
    user: null,
    loading: true,
    logout: () => { }
})

const AuthContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    // useEffect(() => {
    //     // Returns the user or null and triggers every time theres a change
    //     const cancelAuthListener = firebaseAuth.onIdTokenChanged(u => {
    //         setUser(u)
    //         setLoading(false)
    //     });
    //     // Stop listening when th app unmount
    //     return () => cancelAuthListener();
    // }, [])

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((u) => {
            if (u) {
                // var uid = user.uid;
                // User logged in
                // console.log(u);
                setUser(u)
                
            } else{
                // user logged out
            }
            setLoading(false)
        })
        // setLoading(false)
    }, [])
    return (
        <AuthContext.Provider value={{ user, loading, logout: () => firebase.auth().signOut() }}>
            {children}
        </AuthContext.Provider>
    )
}

// Provides the 3 values (user, loading, logout)
function useAuth() {
    return useContext(AuthContext)
}

export { AuthContextProvider, useAuth }