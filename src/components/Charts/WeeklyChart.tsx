import { IonCard } from '@ionic/react';
import React from 'react'
import { Bar, Line } from 'react-chartjs-2';
import { IHabit, useHabits } from '../../Contexts/habitsProvider';
import { Heading5 } from '../../theme/globalStyles';
import { getDateString, incrementToday } from '../Dates/DatesFunctions';


export interface IWeeklyChart {
    habits: IHabit[];
}
const WeeklyChart: React.FC<IWeeklyChart> = ({ habits }) => {
    let weekdays = ["M", "T", "W", "T", "F", "S", "S"];
    let weekTotal = 0;
    let getvalues = (habits: IHabit[]) => {
        let values = weekdays.map((weekday, index) => {
            let increment = (index - 6);
            let dateString = (getDateString(incrementToday(increment)));
            let dateStringForHuman = (getDateString(incrementToday(increment), "full", true));
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
            weekTotal += achieved;
            totalHabits = totalHabits === 0 ? 1 : totalHabits;
            return (achieved * 100 / totalHabits)
            // achieved = achieved === 0 ? totalHabits/20 : achieved; // Hack to never show a value of 0 in the progress bar
        }
        )
        console.log(values)
        return values
    }
    // console.log()
    let options = {
        maintainAspectRatio: true,
        scales: {
            
            xAxes: {
                title:{
                    display: true, 
                    text: "Last 7 days"
                }
            },
            yAxes: {
                min: 0,
                max: 100,
                title:{
                    display: true, 
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
        labels: weekdays,
        datasets: [{
            label: 'Completion rate %',
            data: getvalues(habits),
            backgroundColor: "rgba(0, 255, 162, 0.2)",
            borderColor: "rgb(0, 255, 162)",
            borderWidth: 2
        }]
    }
    return (
        <IonCard mode="ios" color="light">
            <Heading5 style={{ margin: "1em auto", textAlign: "center" }}>
                Completed in the last 7 days
            </Heading5>
            <Line data={data} options={options} />
        </IonCard>
    )
}

export default WeeklyChart
