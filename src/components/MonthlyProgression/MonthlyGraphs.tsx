import { IonSlides, IonSlide, IonCard, IonButton, IonIcon } from '@ionic/react'
import { add, addCircleOutline } from 'ionicons/icons'
import React from 'react'
import { IHabit, useHabits } from '../../Contexts/habitsProvider'
import { Heading4, Heading5, LargeParagraph, MediumButton } from '../../theme/globalStyles'
import { todayDate } from '../Dates/DatesFunctions'
import MonthlyGraph from './MonthlyGraph'

// export interface IMonthlyGraphs {
//     habits: IHabit[];
// }
const MonthlyGraphs: React.FC = () => {
    const {habits} = useHabits()
    const sliderOptions = {
        initialSlide: 0,
        speed: 400,
        spaceBetween: 8,
        slidesPerView: 1.1,

    }
    return (
        <div style={{  margin: "3em 0" }}>
            <Heading5 style={{ margin: "1em auto", textAlign: 'center'}}>
            {/* {todayDate("month")} */}
            What you have been up to this month
            </Heading5>
            {habits?.length != 0 ? (
                <IonSlides options={sliderOptions} pager={true}>
                    {habits.map((habit, index) => (
                        <IonSlide className="ion-padding-horizontal" key={`slide=graph=${index}`} >
                            <MonthlyGraph habit={habit} />

                        </IonSlide>
                    ))}
                </IonSlides>
            ) : (
                <div className="ion-padding" style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <LargeParagraph style={{ textAlign: 'center' }}>No active habits</LargeParagraph>
                    <IonButton mode="ios" routerLink="/new" fill="solid">

                        <IonIcon icon={addCircleOutline}></IonIcon>
                        <MediumButton>
                            Add a new one
                        </MediumButton>
                    </IonButton>
                </div>
            )}
        </div>
    )
}

export default MonthlyGraphs

// spaceBetween: 8,
//         breakpoints: {
//             // when window width is >= 320px
//             320: {
//                 slidesPerView: 1.15,
//                 spaceBetween: 20
//             },
//             // when window width is >= 480px
//             480: {
//                 slidesPerView: 2.2,
//                 spaceBetween: 26
//             },
//             // when window width is >= 640px
//             640: {
//                 slidesPerView: 2.2,
//                 spaceBetween: 16
//             }
//         }