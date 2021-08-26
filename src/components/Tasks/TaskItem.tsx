import { IonCard, IonToggle } from '@ionic/react'
import React from 'react'
import { IHabits } from '../../Contexts/habitsProvider'
import { Heading5, RowContainer } from '../../theme/globalStyles'

const TaskItem: React.FC<IHabits> = ({ name, id, dates}) => {
    return (
        <IonCard mode="ios" className="ion-padding-horizontal"  routerLink={`/habit/${id}`} color="light"  style={{ border: "2px solid"}}  button={true}>

                <Heading5>{name}</Heading5>
                {/* <IonCardSubtitle>Streak: 000</IonCardSubtitle> */}
        </IonCard>
    )
}

export default TaskItem
