import { IonBadge, IonProgressBar } from '@ionic/react';
import React from 'react'
import { useHabits } from '../../Contexts/habitsProvider';
import { RowContainer } from '../../theme/globalStyles';
import { getDateString, incrementToday } from '../Dates/DatesFunctions';
import "./WeeklyProgression.css"
const WeeklyProgression = () => {
    const { habits, loadingHabits } = useHabits()
    let weekdays = ["M", "T", "W", "T", "F", "S", "S"]

    return (
        <div className="weekly-progression">
            {weekdays.map((weekday, index) => {
                let increment = (index - 6);
                let dateString = (getDateString(incrementToday(increment)));
                let achieved = 0;
                let totalHabits = 0; //habits whose first date are superior to dateString
                {
                    habits.forEach((habit) => {
                        if (habit.dates.includes(dateString)) achieved += 1;
                        if (parseInt(habit.dates[0]) <= parseInt(dateString)) totalHabits += 1
                    })
                }
                // console.log(achieved, totalHabits)
                // if empty chnage the value to get empty bars
                totalHabits = totalHabits === 0 ? 1 : totalHabits;
                return (
                    <RowContainer key={dateString}>
                        <IonBadge mode="ios" color="light" className="ion-margin">{dateString}</IonBadge>
                        <IonProgressBar className="ion-margin-vertical" style={{ padding: "0.5em", borderRadius: "5em" }}  value={achieved / totalHabits}></IonProgressBar>
                    </RowContainer>
                )
                // let dayString = getDateString(incrementToday(increment), "day");
                // return (
                //     <li className={dates.includes(dateString) ? "completed weekly-squares" : "weekly-squares"} key={"weeklySquare" + index}>{dayString}</li>

                //     )
            })}
        </div>
    )
}

export default WeeklyProgression;
