import { IonButton, IonCard, IonCheckbox, IonIcon, IonToggle, useIonRouter, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import { calendar, chevronForward, informationCircle } from 'ionicons/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../Contexts/authProvider'
import { IHabit, useHabits } from '../../Contexts/habitsProvider'
import { firebaseStore, firebase, arrayUnion, arrayRemove } from '../../initFirebase'
import { Heading6, RowContainer } from '../../theme/globalStyles'
import { getDateString, incrementToday } from '../Dates/DatesFunctions'
import { toast } from '../Toasts/Toast'
import WeeklyCalendar from './WeeklyCalendar'
import "./WeeklyCalendar.css"
// import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

interface IClickableHabit {
    id: string,
    inView: boolean,
    taskIndex: number,
    onClickHandler: (habit: IHabit) => void;
}

const TaskItem: React.FC<IClickableHabit> = ({ id, onClickHandler, taskIndex, inView }) => {
    let todayDateString = getDateString(incrementToday(0));
    let delay = (taskIndex * 0.1) + "s"
    console.log(delay)

    const { habits } = useHabits();
    const [habit] = habits.filter(habit => habit.id === id);
    const { name, dates } = habit;

    const [habitChecked, setHabitChecked] = useState<boolean>(dates.includes(todayDateString))


    const elTask = useRef<HTMLIonCardElement>(null);

    useEffect(() => {
        console.log("animated")
    }, [inView])
    const handleChange = async () => {
        // console.log()
        return
        // setHabitChecked(!habitChecked)
    }
    const router = useIonRouter();
    const goToGraph = (path: string) => {
        router.push(path, "forward")
    }

    return (
        <IonCard ref={elTask} mode="ios" button={true} className={inView ? "ion-padding animate-fade animated" : "ion-padding animate-fade"} onClick={() => onClickHandler({ name, id, dates })} style={{ border: "2px solid var(--ion-color-medium)", marginLeft: "0", marginRight: "0", backgroundColor: "transparent", transitionDelay: delay}}  >
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center" }}>

                {/* <IonCheckbox mode="ios" onClick={()=>handleChange()} checked={habitChecked}/> */}
                <Heading6 onClick={() => handleChange()} className={dates.includes(todayDateString) ? "ion-margin-horizontal strikethrough" : "ion-margin-horizontal"}>{name}</Heading6>
                {/* <IonButton fill="clear" onClick ={ () => goToGraph(`/habit/${id}`)} >
                    <IonIcon icon={chevronForward} />
                </IonButton> */}
            </div>
            {/* <div style={{ display: "flex", alignItems: "center"}}>
                <WeeklyCalendar dates={dates}/>
            </div> */}

            {/* <IonCardSubtitle>Streak: 000</IonCardSubtitle> */}
        </IonCard>
    )
}

export default TaskItem
