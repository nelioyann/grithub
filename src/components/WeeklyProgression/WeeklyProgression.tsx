import { IonBadge, IonCard, IonNote, IonProgressBar } from '@ionic/react';
import React from 'react'
import { useHabits } from '../../Contexts/habitsProvider';
import { Heading4, Heading5, RowContainer, SmallParagraph } from '../../theme/globalStyles';
import { getDateString, incrementToday } from '../Dates/DatesFunctions';
import "./WeeklyProgression.css"
const WeeklyProgression = () => {
    const { habits, loadingHabits } = useHabits();
    let weekdays = ["M", "T", "W", "T", "F", "S", "S"];
    let weekTotal = 0;

    return (
        <IonCard mode="ios" color="light" className="weekly-progression-outer">
            <Heading5 style={{ margin: "1em auto", textAlign: "center" }}>
                Completed in the last 7 days
            </Heading5>
            <div className="weekly-progression-inner">
                {weekdays.map((weekday, index) => {
                    let increment = (index - 6);
                    let dateString = (getDateString(incrementToday(increment)));
                    let dateStringForHuman = (getDateString(incrementToday(increment), "full", true));
                    let achieved = 0;
                    let totalHabits = 0; //habits whose first date are superior to dateString
                    {
                        habits.forEach((habit) => {
                            if(!habit.dates) return
                            if ( habit.dates.includes(dateString)) achieved += 1;
                            if (parseInt(habit.dates[0]) <= parseInt(dateString)) totalHabits += 1
                        })
                    }
                    // if empty chnage the value to get empty bars
                    weekTotal += achieved;
                    totalHabits = totalHabits === 0 ? 1 : totalHabits;
                    achieved = achieved === 0 ? totalHabits/20 : achieved; // Hack to never show a value of 0 in the progress bar
                    return (
                        <RowContainer key={dateString}>
                            <SmallParagraph className="progress-label" >{dateStringForHuman}</SmallParagraph>
                            <IonProgressBar color="success" style={{ padding: "0.3em", borderRadius: "5em" }} value={achieved / totalHabits}></IonProgressBar>
                        </RowContainer>
                    )

                })}
            </div>
            <SmallParagraph>
                {weekTotal} habit{weekTotal > 1 && "s"}
            </SmallParagraph>
        </IonCard>

    )
}

export default WeeklyProgression;
