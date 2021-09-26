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
import Lottie from "react-lottie";
import confettiAnimation from "./Animations/confetti.json"


const confettiOptions = { loop: true, animationData: confettiAnimation, autoplay: true }


interface IClickableHabit {
    id: string,
    inView: boolean,
    taskIndex: number,
    onClickHandler: (habit: IHabit) => void;
}

const TaskItem: React.FC<IClickableHabit> = ({ id, onClickHandler, taskIndex, inView }) => {
    let todayDateString = getDateString(incrementToday(0));
    let delay = (taskIndex * 0.3) + "s"
    // console.log(delay)

    const { habits } = useHabits();
    const [habit] = habits.filter(habit => habit.id === id);
    const { name, dates } = habit;

    const [habitChecked, setHabitChecked] = useState<boolean>(dates.includes(todayDateString))


    const elTask = useRef<HTMLIonCardElement>(null);

    // useEffect(() => {
    //     console.log("animated")
    // }, [inView])
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
        <IonCard ref={elTask} mode="ios" button={true} className={inView ? "ion-padding animate-fade-down animated" : "ion-padding animate-fade-down"} onClick={() => onClickHandler({ name, id, dates })} style={{ border: "1px solid var(--ion-color-medium-tint)", marginLeft: "0", marginRight: "0", backgroundColor: "transparent", animationDelay: delay, position: "relative" }}  >
            {dates.includes(todayDateString) &&

                <Lottie style={{ position: "absolute", top: "50%", left: "50%",transform: "translate(-50%, -50%)",  width: "100%",  height: "initial", zIndex: -1 }} isClickToPauseDisabled={true} options={confettiOptions}  />
            }
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center" }}>

                <Heading6 onClick={() => handleChange()} className={dates.includes(todayDateString) ? "ion-margin-horizontal strikethrough" : "ion-margin-horizontal"}>{name}</Heading6>

            </div>
 
        </IonCard>
    )
}

export default TaskItem
