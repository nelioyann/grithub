import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from '../components/Toasts/Toast'
import { firebaseStore } from '../initFirebase'
import { useAuth } from './authProvider'

export interface IHabit {
    name: string;
    dates: string[];
    id: string;
}

interface IContext {
    habits: IHabit[],
    loadingHabits: boolean;
}

// const HabitsContext

const HabitsContext = createContext<IContext>({
    habits: [],
    loadingHabits: true
})

function useHabits() {
    return useContext(HabitsContext)
}

const HabitsContextProvider: React.FC = ({ children }) => {
    const { user, loading } = useAuth();
    const [habits, setHabits] = useState<IHabit[]>([]);
    // const {loading} = useAuth()
    const [loadingHabits, setLoadingHabits] = useState<boolean>(true);

    // useEffect(() => {
    useEffect(() => {
        try {
            // If there is no user don't listen for data
            if (user === null) {

                console.log("No user");
                return
            }
            // console.log("does it exist ?", firebaseStore.collection("users")
            //     .doc(user!.uid).collection("habits").get())
            const unsubscribe = firebaseStore.collection("users")
                .doc(user!.uid).collection("habits").onSnapshot((snapshot) => {

                    setHabits(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            name: doc.data().name,
                            dates: doc.data().dates
                        })))


                })
        console.log("loading falsed")
    setLoadingHabits(false)
        

            return () => {
                console.log("unsubcribed")
                unsubscribe()

            }
        } catch (e) {
            console.log("e.message")
        }
    }, [user])
    // let result = firebaseStore.collection("users")
    //     .doc(user!.uid).collection("habits").get().then(querySnapshot => {
    //         querySnapshot.forEach((doc)=>{
    //             return ({
    //                 id: doc.id,
    //                 name: doc.data().name,
    //                 dates: doc.data().dates
    //             });
    //         })
    // })

// useEffect(() => {
//     setLoadingHabits(false)

// }, [habits])

    // console.log(result)

    //     if (doc.exists) {
    //         // Convert to City object
    //         var city = doc.data() || "none";
    //         // Use a City instance method
    //         console.log(city.toString());
    //     } else {
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);

    // setHabits([])

    // }), []

    return (
        <HabitsContext.Provider value={{ habits, loadingHabits }}>
            {children}
        </HabitsContext.Provider>
    )
}
export { useHabits, HabitsContextProvider }