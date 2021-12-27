/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../src/theme/variables.css';
// import '../src/theme/fonts.css';

import React from 'react';
// import {addDecorator} from '@storybook/react';
import {IonApp, IonContent, IonPage} from "@ionic/react"

const IonWrapper = ({children}) => {
  return (
    <IonApp>
      <IonPage>
        <IonContent>
          {children}
        </IonContent>
      </IonPage>
    </IonApp>
  )
}

export const decorators = [
  (Story) => (
    <IonWrapper>
      {Story()}
    </IonWrapper>
  )
]
// addDecorator((storyFn) => <IonWrapper>{storyFn()}</IonWrapper>)
