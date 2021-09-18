import { IonButton, IonCard, IonCheckbox, IonIcon, IonToggle, useIonRouter } from '@ionic/react'
import { calendar, chevronForward, informationCircle } from 'ionicons/icons'
import React, {useEffect, useState} from 'react'
import { useAuth } from '../../Contexts/authProvider'
import { IHabit } from '../../Contexts/habitsProvider'
import { firebaseStore, firebase, arrayUnion, arrayRemove } from '../../initFirebase'
import { Heading6, RowContainer } from '../../theme/globalStyles'
import { getDateString, incrementToday } from '../Dates/DatesFunctions'
import { toast } from '../Toasts/Toast'
import WeeklyCalendar from './WeeklyCalendar'
import "./WeeklyCalendar.css"
// import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

interface IClickableHabit extends IHabit{
    onClickHandler: (habit: IHabit) => void;
}

const TaskItem: React.FC<IClickableHabit> = ({ name, id, dates, onClickHandler }) => {
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
            } catch(error){
                toast(error.message)
    
            }
        }
        updateArray()
    }, [habitChecked])

    const handleChange = async () =>{
        setHabitChecked(!habitChecked)
        
        
        
    }
    const router = useIonRouter();
    const goToGraph = (path: string) =>{
        router.push(path, "forward")
    }

    return (
        <IonCard mode="ios" button={true} className="ion-padding"  onClick={() => onClickHandler({ name, id, dates })} style={{ border: "2px solid var(--ion-color-medium)", marginLeft: "0", marginRight: "0", backgroundColor: "transparent"}}  >
            <div style={{display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center"}}>

                <IonCheckbox mode="ios" onClick={()=>handleChange()} checked={habitChecked}/>
                <Heading6 onClick={()=>handleChange()} className={habitChecked ? "ion-margin-horizontal strikethrough" : "ion-margin-horizontal"}>{name}</Heading6>
                <IonButton fill="clear" onClick ={ () => goToGraph(`/habit/${id}`)} >
                    <IonIcon icon={chevronForward} />
                </IonButton>
            </div>
            {/* <div style={{ display: "flex", alignItems: "center"}}>
                <WeeklyCalendar dates={dates}/>
            </div> */}
                
            {/* <IonCardSubtitle>Streak: 000</IonCardSubtitle> */}
        </IonCard>
    )
}

export default TaskItem
