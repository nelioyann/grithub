import { IonBadge, IonCard, IonNote, IonProgressBar } from '@ionic/react';
import React from 'react'
import { useHabits } from '../../Contexts/habitsProvider';
import { Heading4, RowContainer, SmallParagraph } from '../../theme/globalStyles';
import { getDateString, incrementToday } from '../Dates/DatesFunctions';
import "./WeeklyProgression.css"
const WeeklyProgression = () => {
    const { habits, loadingHabits } = useHabits();
    let weekdays = ["M", "T", "W", "T", "F", "S", "S"]

    return (
        <IonCard mode="ios" color="light"  className="weekly-progression-outer">
            <Heading4 style={{margin: "1em auto", textAlign: "center" }}>
              Last 7 days
            </Heading4>
            <div className="weekly-progression-inner">
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
                    // if empty chnage the value to get empty bars
                    totalHabits = totalHabits === 0 ? 1 : totalHabits;
                    return (
                        <RowContainer key={dateString}>
                            <SmallParagraph className="progress-label" >{dateString}</SmallParagraph>
                            <IonProgressBar color={achieved / totalHabits >= 0.5 ? "success" : "danger"}   style={{ padding: "0.3em", borderRadius: "5em"}} value={achieved / totalHabits}></IonProgressBar>
                        </RowContainer>
                    )

                })}
            </div>
        </IonCard>

    )
}

export default WeeklyProgression;
