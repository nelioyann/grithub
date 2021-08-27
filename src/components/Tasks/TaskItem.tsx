import { IonButton, IonCard, IonCheckbox, IonIcon, IonToggle } from '@ionic/react'
import { calendar } from 'ionicons/icons'
import React, {useEffect, useState} from 'react'
import { useAuth } from '../../Contexts/authProvider'
import { IHabits } from '../../Contexts/habitsProvider'
import { firebaseStore, firebase, arrayUnion, arrayRemove } from '../../initFirebase'
import { Heading5, RowContainer } from '../../theme/globalStyles'
import { getDateString, incrementToday } from '../Dates/DatesFunctions'
import { toast } from '../Toasts/Toast'
import WeeklyCalendar from './WeeklyCalendar'
import "./WeeklyCalendar.css"
// import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const TaskItem: React.FC<IHabits> = ({ name, id, dates }) => {
    let todayDateString = getDateString(incrementToday(0));
    const [habitChecked, setHabitChecked] = useState<boolean>(dates.includes(todayDateString))

    const { user } = useAuth()
    // console.log()


    useEffect( () => {
        const updateArray = async () =>{
            try{
                let ref = await firebaseStore.collection("users").doc(user!.uid)
                .collection("habits").doc(id)
                if(habitChecked){
                // console.log("adding", todayDateString)
                
                ref.update({
                    dates: arrayUnion(todayDateString)
                })
            } else{
                    // console.log("removing", todayDateString)
                    ref.update({
                        dates: arrayRemove(todayDateString)
                    })
    
                }
            }catch(error){
                toast(error.message)
    
            }
        }
        updateArray()
    }, [habitChecked])

    const handleChange = async () =>{
        setHabitChecked(!habitChecked)

        
        
    }
    return (
        <IonCard mode="ios" className="ion-padding-horizontal" color="light" style={{ border: "2px solid" }}  >
            <RowContainer>

                <IonCheckbox onClick={()=>handleChange()} checked={habitChecked}/>
                <Heading5  className="ion-margin-horizontal">{name}</Heading5>
            </RowContainer>
            <div style={{ display: "flex", alignItems: "center"}}>
                <WeeklyCalendar dates={dates}/>
                {/* <IonButton expand="block">Mark as done</IonButton> */}
            </div>
                <IonButton fill="clear" routerLink={`/habit/${id}`}>
                    <IonIcon icon={calendar} />
                </IonButton>
            {/* <IonCardSubtitle>Streak: 000</IonCardSubtitle> */}
        </IonCard>
    )
}

export default TaskItem
