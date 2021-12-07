import { IonButton, IonCard, IonCheckbox, IonIcon, IonNote, IonToggle, useIonRouter, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import { calendar, chevronForward, informationCircle, repeat } from 'ionicons/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../Contexts/authProvider'
import { IHabit, useHabits } from '../../Contexts/habitsProvider'
import { firebaseStore, firebase, arrayUnion, arrayRemove } from '../../initFirebase'
import { ColumnContainer, Heading5, Heading6, RowContainer, SmallParagraph } from '../../theme/globalStyles'
import { getDateString, incrementToday } from '../Dates/DatesFunctions'
import { toast } from '../Toasts/Toast'
import WeeklyCalendar from './WeeklyCalendar'
import "./WeeklyCalendar.css"
// import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import Lottie from "react-lottie";
import confettiAnimation from "./Animations/confetti.json"


const confettiOptions = { loop: true, animationData: confettiAnimation, autoplay: true }


export interface IClickableHabit {
    id: string,
    inView: boolean,
    taskIndex: number,
    onClickHandler: (habit: IHabit) => void;
    confetti?: boolean
}

const TaskItem: React.FC<IClickableHabit> = ({ id, onClickHandler, taskIndex, inView, confetti }) => {
    let todayDateString = getDateString(incrementToday(0));
    let delay = (taskIndex * 0.3) + "s"
    // console.log(delay)

    const { habits } = useHabits();
    const [habit] = habits.filter(habit => habit.id === id);
    let { name, dates } = habit;
    if(!dates) dates = []

    const [habitChecked, setHabitChecked] = useState<boolean>(dates.includes(todayDateString));


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
        <IonCard ref={elTask} mode="ios" button={true} className={inView ? "animate-fade-down animated" : "animate-fade-down"} onClick={() => onClickHandler({ name, id, dates })} style={{ display: "flex", border: dates.includes(todayDateString) ? "2px solid var(--ion-color-success)" : "2px solid var(--ion-color-medium-tint)", margin: "0", backgroundColor: "transparent",minHeight: "14em", animationDelay: delay, position: "relative", boxShadow: dates.includes(todayDateString) && "none" }}  >
            {confetti && dates.includes(todayDateString) &&

                <Lottie style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "initial", zIndex: -1 }} isClickToPauseDisabled={true} options={confettiOptions} />
            }
            <ColumnContainer style={{height: "100%", justifyContent: "space-between", padding: "1em"}} >

                <Heading6 onClick={() => handleChange()} style={{textAlign: "left"}} className={dates.includes(todayDateString) ? "task-completed" : ""}>{name}</Heading6>
                <IonNote className="" style={{display: "flex", alignItems: "center"}}>
                    {/* <IonIcon color="dark" icon={repeat}></IonIcon> */}
                    <SmallParagraph style={{margin: "0 0 0 8px"}}>done {dates?.length} {dates?.length > 1 ? "times" : "time"}</SmallParagraph>
                </IonNote>
            </ColumnContainer>

        </IonCard>
    )
}

export default TaskItem
