import { IonSlides, IonSlide, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import React, { useRef, useState } from 'react'
import { IHabit, useHabits } from '../../Contexts/habitsProvider';
import { Heading5 } from '../../theme/globalStyles';
import { getDateString, incrementToday } from '../Dates/DatesFunctions';
import TaskItem from './TaskItem';


export interface ISegmentedTasks {
    inView: boolean;
    onClickHandler: (habit: IHabit) => void;
}
const SegmentedTasks: React.FC<ISegmentedTasks> = ({ inView, onClickHandler }) => {
    let todayDateString = getDateString(incrementToday(0));

    const { habits, loadingHabits } = useHabits();
    const completedHabits = habits.filter(habit => habit.dates.includes(todayDateString))
    const incompletedHabits = habits.filter(habit => !habit.dates.includes(todayDateString))


    // a ref variable to handle the current slider
    const slider = useRef<HTMLIonSlidesElement>(null);
    // Segment State
    const [taskViewSegment, settaskViewSegment] = useState("0");
    // a function to handle the segment changes
    const handleSegmentChange = (e: any) => {
        settaskViewSegment(e.detail.value);
        slider.current!.slideTo(e.detail.value);
    };
    // a function to handle the slider changes
    const handleSlideChange = async (event: any) => {
        let index: number = 0;
        await event.target.getActiveIndex().then((value: any) => (index = value));
        settaskViewSegment("" + index);
    };
    return (
        <>
            <Heading5 className="ion-margin-vertical">
                Take a moment to tick off what you achieved today
            </Heading5>
            <div >

            <IonSegment
                value={taskViewSegment}
                onIonChange={(e) => handleSegmentChange(e)}
                mode="ios"
                >
                <IonSegmentButton value="0">
                    <IonLabel>To do</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="1">
                    <IonLabel>Achieved</IonLabel>
                </IonSegmentButton>
            </IonSegment>
                </div>
            {!loadingHabits && (<div>
                <IonSlides 
                onIonSlideDidChange={(e) => handleSlideChange(e)}
                ref={slider}
                className="ion-margin-vertical"
                >
                    <IonSlide>
                        {!loadingHabits && (
                            incompletedHabits.length > 0 ?
                                (incompletedHabits.map((habit, index) => (
                                    <TaskItem id={habit.id} taskIndex={index} inView={inView} onClickHandler={() => onClickHandler(habit)} />
                                )))
                                :
                                (
                                    <>Nothing left to do</>
                                )
                        )}
                    </IonSlide>
                    <IonSlide>
                        {!loadingHabits && (
                            completedHabits.map((habit, index) => (
                                <TaskItem id={habit.id} taskIndex={index} inView={inView} onClickHandler={() => onClickHandler(habit)} />
                            ))
                        )}
                    </IonSlide>
                </IonSlides>
            </div>)}
        </>
    )
}

export default SegmentedTasks
