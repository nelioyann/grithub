import { IonIcon } from '@ionic/react';
import { today, square, squareOutline } from 'ionicons/icons';
import React from 'react'
import { IHabit } from '../../Contexts/habitsProvider';
import { Heading5,Heading6, SmallParagraph, RowContainer } from '../../theme/globalStyles';
import { todayDate, getDateString } from '../Dates/DatesFunctions';

export interface IMonthlyGraph {
    habit: IHabit;
}

const MonthlyGraph: React.FC<IMonthlyGraph> = ({ habit }) => {
    const monthlySquares = Array.from({ length: 31 }, (_, i) => i + 1);
    let today = new Date();
    const startDate = habit?.dates && habit?.dates.length > 0 ? habit.dates[0] : getDateString(today);
    let startDateReachedMonth = false;
    let todayReachedMonth = false;
    return (
        <div>
            {/* <Heading5>{todayDate("month")}</Heading5> */}
            <Heading6>{habit.name}</Heading6>
            <div className="monthGraph">
                <ul className="squares">
                    {habit &&
                        habit?.dates &&
                        monthlySquares.map((index, monthlySquare) => {

                            let month = getDateString(today, "month");
                            let day = index % 31 === 0
                                ? "31"
                                : (index % 31).toString().padStart(2, "0");
                            let date = month + day;
                            if (parseInt(date) >= parseInt(startDate)) startDateReachedMonth = true;
                            if (parseInt(date) >= parseInt(getDateString(today))) todayReachedMonth = true;

                            return (
                                <li
                                    className={habit.dates.includes(date) && startDateReachedMonth ? "completed" : "uncompleted"}
                                    key={"calendarSquare" + index}
                                    data-level={startDateReachedMonth && !todayReachedMonth ? "tracked" : "untracked"}
                                    data-day={day}
                                    data-month={month}
                                >
                                    <SmallParagraph style={{ margin: 0, color: "inherit" }}>
                                        {monthlySquare + 1}
                                    </SmallParagraph>
                                </li>
                            );
                        })}
                </ul>
                <div
                    className="helperGraph ion-padding"
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: "15em", margin: "auto" }}
                >
                    <RowContainer>
                        <IonIcon color="tertiary" icon={square}></IonIcon>
                        <SmallParagraph style={{ paddingLeft: "0.3em" }}>
                            Completed
                        </SmallParagraph>
                    </RowContainer>
                    <RowContainer>
                        <IonIcon color="tertiary" icon={squareOutline}></IonIcon>
                        <SmallParagraph style={{ paddingLeft: "0.3em" }}>
                            Not Completed
                        </SmallParagraph>
                    </RowContainer>
                    <RowContainer>
                        <IonIcon color="medium" icon={square}></IonIcon>
                        <SmallParagraph style={{ paddingLeft: "0.3em" }}>
                            Not tracked
                        </SmallParagraph>
                    </RowContainer>
                </div>
            </div>
        </div>
    )
}

export default MonthlyGraph