import { IonCard, IonToggle } from '@ionic/react'
import React from 'react'
import { Heading5, RowContainer } from '../../theme/globalStyles'

const TaskItem: React.FC= () => {
    return (
        <IonCard mode="ios" className="ion-padding-horizontal" routerLink="/habit" color="light"  style={{ border: "2px solid"}} key={"dummy.id"} button={true}>

                <Heading5>{"dummy.name"}</Heading5>
                {/* <IonCardSubtitle>Streak: 000</IonCardSubtitle> */}
        </IonCard>
    )
}

export default TaskItem
