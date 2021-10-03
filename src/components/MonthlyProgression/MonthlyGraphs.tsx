import { IonSlides, IonSlide, IonCard } from '@ionic/react'
import React from 'react'
import { IHabit } from '../../Contexts/habitsProvider'
import { Heading4 } from '../../theme/globalStyles'
import MonthlyGraph from './MonthlyGraph'

export interface IMonthlyGraphs {
    habits: IHabit[];
}
const MonthlyGraphs: React.FC<IMonthlyGraphs> = ({ habits }) => {
    const sliderOptions = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 1,

    }
    return (
                <IonCard mode="ios" color="light" style={{border: "1px solid var(--ion-color-medium-tint)", margin: "2em 0"}}>
            <Heading4 style={{ margin: "1em auto", textAlign: "center" }}>
                This Month
            </Heading4>
            <IonSlides options={sliderOptions} pager={true}>
                {habits.map((habit) => (
                    <IonSlide>
                        <MonthlyGraph habit={habit} />

                    </IonSlide>
                ))}
            </IonSlides>
                </IonCard>
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