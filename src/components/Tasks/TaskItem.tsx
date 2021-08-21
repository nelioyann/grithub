import { IonCard, IonToggle } from '@ionic/react'
import React from 'react'
import { Heading5, RowContainer } from '../../theme/globalStyles'

const TaskItem = () => {
    return (
        <IonCard className="ion-padding" style={{display: 'flex'}} button={true}>
            <RowContainer>

            <Heading5>Exercice</Heading5>
            <IonToggle />
            </RowContainer>
        </IonCard>
    )
}

export default TaskItem
