import React from 'react'
import { getDateString, incrementToday } from '../Dates/DatesFunctions'


interface IWeekly{
    dates: string[]
}
const WeeklyCalendar: React.FC<IWeekly> = ({dates}) => {
    // console.log(dates)
    // let dummies = ["0827", "0825"]
    let weekdays  = ["M", "T", "W", "T", "F", "S", "S"]
    return (
        <ul className="weekly-graph">
            {weekdays.map((weekday, index ) => {
                let increment = (index - 6);
                let dateString = (getDateString(incrementToday(increment)));
                let dayString = getDateString(incrementToday(increment), "day");
                return (
                    <li className={dates.includes(dateString) ? "completed weekly-squares" : "weekly-squares"} key={"weeklySquare" + index}>{dayString}</li>
                )
            })}
            {/* <li className="weekly-squares">M</li>
            <li className="weekly-squares">T</li>
            <li className="weekly-squares">W</li>
            <li className="weekly-squares">T</li>
            <li className="weekly-squares">F</li>
            <li className="weekly-squares">S</li>
            <li className="weekly-squares">S</li> */}
        </ul>
    )
}

export default WeeklyCalendar
