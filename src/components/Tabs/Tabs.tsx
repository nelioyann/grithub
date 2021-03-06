import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { appsOutline, globeOutline, trendingUp, personCircle } from 'ionicons/icons'
import React from 'react'
import { Route, Redirect } from 'react-router'
import Tab1 from '../../pages/Tab1'
import Tab2 from '../../pages/Tab2'


import "./Tabs.css"



function Tabs() {
  return (
    <IonTabs >
      <IonRouterOutlet>
        <Route exact path="/tabs/habits">
          <Tab1 />
        </Route>
        <Route exact path="/tabs/community">
          <Tab2 />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/habits" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar className="bottom-tab-bar" style={{ backgroundColor: "var(--ion-color-light)", "--background": "var(--ion-color-light)", "--color-selected": "var(--ion-color-primary-shade)", "--color": "var(--ion-color-medium-shade)", height: "60px" }} slot="bottom" >
        <IonTabButton layout="label-hide" tab="tab1" href="/tabs/habits">
          <IonIcon icon={appsOutline} />
          <IonLabel>Habits</IonLabel>
        </IonTabButton>
        <IonTabButton layout="label-hide" tab="tab2" href="/tabs/community">
          <IonIcon icon={globeOutline} />
          <IonLabel>Community</IonLabel>
        </IonTabButton>

      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs
