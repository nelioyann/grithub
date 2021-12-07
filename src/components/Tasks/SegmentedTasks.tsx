import { IonSlides, IonSlide, IonLabel, IonSegment, IonSegmentButton, IonCard, IonBadge, IonChip } from '@ionic/react';
import React, { useRef, useState } from 'react'
import { IHabit, useHabits } from '../../Contexts/habitsProvider';
import { ColumnContainer, Heading5, Heading6 } from '../../theme/globalStyles';
import { getDateString, incrementToday } from '../Dates/DatesFunctions';
import TaskItem from './TaskItem';
import Lottie from "react-lottie";
import completedAnimation from "./Animations/completed.json"
import loadingAnimation from "./Animations/loading.json"
import "./SegmentedTasks.css"


export interface ISegmentedTasks {
    inView: boolean;
    onClickHandler: (habit: IHabit) => void;
}
const SegmentedTasks: React.FC<ISegmentedTasks> = ({ inView, onClickHandler }) => {
    const completedOptions = { loop: true, animationData: completedAnimation, autoplay: true }
    const loadingOptions = { loop: true, animationData: loadingAnimation, autoplay: true }
    let todayDateString = getDateString(incrementToday(0));

    const { habits, loadingHabits } = useHabits();
    const completedHabits = habits.filter(habit => habit.dates.includes(todayDateString))
    const incompletedHabits = habits.filter(habit => !habit.dates.includes(todayDateString))

    // a ref variable to handle the current slider
    const slider = useRef<HTMLIonSlidesElement>(null);
    const sliderOptions = {
        initialSlide: 0,
        speed: 400,
        spaceBetween: 10,
        slidesPerView: 1,

    }
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
        <div className="ion-padding-vertical">
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

                        <IonLabel style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <IonBadge mode="ios" color="medium">
                                {habits?.length || 0}
                            </IonBadge>
                            <span>All</span>
                        </IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="1">
                    <IonLabel style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <IonBadge mode="ios" color="danger">
                                {incompletedHabits?.length || 0}
                            </IonBadge>
                            <span>To do</span>
                        </IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="2">
                    <IonLabel style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <IonBadge mode="ios" color="success">
                                {completedHabits?.length || 0}
                            </IonBadge>
                            <span>Done</span>
                        </IonLabel>
                    </IonSegmentButton>
                </IonSegment>
            </div>
            {!loadingHabits && (<div>
                <IonSlides
                    onIonSlideDidChange={(e) => handleSlideChange(e)}
                    ref={slider}
                    options={sliderOptions}
                    className="ion-margin-vertical"
                >
                    <IonSlide >
                        <div className="segmentedTasksGrid ion-no-border" >
                            {!loadingHabits && (
                                habits.length > 0 ?
                                    (habits.map((habit, index) => (
                                        <TaskItem confetti={true} id={habit.id} key={`habits${index}`} taskIndex={index} inView={inView} onClickHandler={() => onClickHandler(habit)} />
                                    )))
                                    :
                                    (
                                        <ColumnContainer>
                                            <Heading6>

                                                No habits
                                            </Heading6>
                                            <Lottie isClickToPauseDisabled={true} options={completedOptions} height={230} width={300} />
                                        </ColumnContainer>

                                    )
                            )}
                        </div>
                    </IonSlide>
                    <IonSlide >
                        <div className="segmentedTasksGrid ion-no-border" >
                            {!loadingHabits && (
                                incompletedHabits.length > 0 ?
                                    (incompletedHabits.map((habit, index) => (
                                        <TaskItem id={habit.id} key={`incompletedhabits${index}`} taskIndex={index} inView={inView} onClickHandler={() => onClickHandler(habit)} />
                                    )))
                                    :
                                    (
                                        <ColumnContainer>
                                            <Heading6>

                                                Seems like there's nothing left to do today
                                            </Heading6>
                                            <Lottie isClickToPauseDisabled={true} options={completedOptions} height={230} width={300} />
                                        </ColumnContainer>

                                    )
                            )}
                        </div>
                    </IonSlide>
                    <IonSlide >
                        <div className="segmentedTasksGrid ion-no-border" >

                            {!loadingHabits && (
                                completedHabits.length > 0 ?
                                    (completedHabits.map((habit, index) => (
                                        <TaskItem  id={habit.id} taskIndex={index} key={`completedhabits${index}`} inView={inView} onClickHandler={() => onClickHandler(habit)} />
                                    )))
                                    :
                                    (
                                        <ColumnContainer>
                                            <Heading6>

                                                Seems like you haven't done anything yet today
                                            </Heading6>
                                            <Lottie isClickToPauseDisabled={true} options={loadingOptions} height={230} width={300} />
                                        </ColumnContainer>

                                    )
                            )}
                        </div>
                    </IonSlide>
                </IonSlides>
            </div>)}
        </div>
    )
}

export default SegmentedTasks
