import { IonCard, IonIcon, useIonRouter } from '@ionic/react';
import { today, square, squareOutline } from 'ionicons/icons';
import React from 'react'
import { IHabit } from '../../Contexts/habitsProvider';
import { Heading5, Heading6, SmallParagraph, RowContainer } from '../../theme/globalStyles';
import { todayDate, getDateString } from '../Dates/DatesFunctions';

export interface IMonthlyGraph {
    habit: IHabit;
}

const MonthlyGraph: React.FC<IMonthlyGraph> = ({ habit }) => {
    const router = useIonRouter();

    const monthlySquares = Array.from({ length: 31 }, (_, i) => i + 1);
    let today = new Date();
    const startDate = habit?.dates && habit?.dates.length > 0 ? habit.dates[0] : getDateString(today);
    let startDateReachedMonth = false;
    let todayReachedMonth = false;
    return (
        <IonCard button={router.routeInfo?.pathname !== `/habit/${habit?.id}`} onClick={() => { 
            if(router.routeInfo?.pathname === `/habit/${habit?.id}`) return null; 
            router.push(`/habit/${habit?.id}`, "forward") }
            }
             mode="ios" color="light" style={{ margin: "2em 0", border: "1px solid var(--ion-color-medium-tint)" }}>
            {/* <Heading5>{todayDate("month")}</Heading5> */}
            <Heading6>{habit?.name}</Heading6>
            <div className="monthGraph">
                <ul className="squares">
                    {habit &&
                        habit?.dates &&
                        monthlySquares.map((index, monthlySquare) => {

                            let month = getDateString(today, "month");
                            let day = index % 31 === 0
                                ? "31"
                                : (index % 31).toString().padStart(2, "0");
                                let year = getDateString(today, "year");
                            let date = month + day + year;
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
                    style={{ display: "flex", flexWrap: "wrap", margin: "auto", gap: "1em", justifyContent: "center" }}   
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
                            Incompleted
                        </SmallParagraph>
                    </RowContainer>
                    <RowContainer>
                        <IonIcon style={{border: "1px dashed var(--ion-color-dark)"}} color="light" icon={square}></IonIcon>
                        <SmallParagraph style={{ paddingLeft: "0.3em" }}>
                            Not tracked
                        </SmallParagraph>
                    </RowContainer>
                </div>
            </div>
        </IonCard>
    )
}

export default MonthlyGraph
