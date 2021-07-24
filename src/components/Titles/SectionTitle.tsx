import { IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText } from '@ionic/react'
import { chevronForwardOutline } from 'ionicons/icons'
import React from 'react'
import { Heading4, Heading5, MediumButton } from '../../theme/globalStyles'


interface SectionTitleProps{
    title: string, 
    showMore?: boolean,
    h5?: boolean,
    target?: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, showMore, h5, target }) => {
    return (
        <IonGrid className="ion-padding-top" style={{paddingLeft:0}}>
            <IonRow className="ion-margin-vertical">
              <IonCol style={{paddingLeft:0}} className="ion-margin-top">
                {h5 ? (
                  
                  <Heading5>{title}</Heading5>
                  ): (
                  <Heading4>{title}</Heading4>

                ) }
              </IonCol>
                { showMore &&
              <IonCol className="ion-align-self-center ion-margin-top ion-justify-content-end" size="3" size-md="2">
                 <IonButton fill="clear" size="small" routerLink={target}>
                  <MediumButton>Tous</MediumButton>
                  <IonIcon icon={chevronForwardOutline} />
                </IonButton>

              </IonCol>
                }
            </IonRow>
          </IonGrid>
    )
}

export default SectionTitle
