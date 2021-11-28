import { IonCard } from '@ionic/react';
import React from 'react'
import { Bar, Line } from 'react-chartjs-2';
import { IHabit, useHabits } from '../../Contexts/habitsProvider';
import { Heading5 } from '../../theme/globalStyles';
import { getDateString, incrementToday } from '../Dates/DatesFunctions';


export interface IWeeklyChart {
    habits: IHabit[];
}

let getWeeklyValues = (habits: IHabit[], previousWeekMultiplier = 1) => {
    let labels: String[] = [];
    let values = Array(7).fill(0).map((_, index) => {
        let increment = (index - 6 * previousWeekMultiplier);
        let dateString = (getDateString(incrementToday(increment)));
        let weekday = (getDateString(incrementToday(increment), "weekDay"));
        labels.push(weekday)
        let achieved = 0;
        let totalHabits = 0; //habits whose first date are superior to dateString
        {
            habits.forEach((habit) => {
                if (!habit.dates) return
                if (habit.dates.includes(dateString)) achieved += 1;
                if (parseInt(habit.dates[0]) <= parseInt(dateString)) totalHabits += 1
            })
        }
        // if empty chnage the value to get empty bars
        // weekTotal += achieved;
        totalHabits = totalHabits === 0 ? 1 : totalHabits;
        console.log(labels)
        return (achieved * 100 / totalHabits)
    }
    )
    return { labels, values }
}

const WeeklyChart: React.FC<IWeeklyChart> = ({ habits }) => {
    // let weekdays = ["M", "T", "W", "T", "F", "S", "S"];
    // let weekdays = ["*", "*", "*", "*", "*", "*", "*"];
    // let weekTotal = 0;
    
    // console.log()
    const { labels, values } = getWeeklyValues(habits);
    let options = {
        maintainAspectRatio: true,
        scales: {

            xAxes: {
                title: {
                    display: false,
                    text: "Last 7 days"
                }
            },
            yAxes: {
                max: 100,
                title: {
                    display: false,
                    text: "%"
                }
            }
        },
        plugins: {
            title: {
                display: false,
                text: "Your achievement this week"
            }
        }
    }
    let data = {
        labels: labels,
        datasets: [{
            label: 'Habit completion rate %',
            data: values,
            backgroundColor: "rgba(0, 255, 162, 0.2)",
            borderColor: "rgb(0, 255, 162)",
            borderWidth: 1,
            fill: true,
            tension: 0.5
        }]
    }
    return (
        <>
            <Heading5 style={{ maxWidth: "30em", margin: "1em auto", textAlign: "center", color: "var(--ion-color-primary)" }}>
                Last 7 days
            </Heading5>
            <IonCard mode="ios" color="light" style={{ margin: "2em 0", border: "1px solid var(--ion-color-medium-tint)" }}>
                <Bar data={data} options={options} />
            </IonCard>
        </>
    )
}

export {WeeklyChart, getWeeklyValues}