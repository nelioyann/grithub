import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { home, compass, trendingUp, personCircle } from 'ionicons/icons'
import React from 'react'
import { Route, Redirect } from 'react-router'
import Tab1 from '../../pages/Tab1'
import Tab2 from '../../pages/Tab2'


import "./Tabs.css"



function Tabs() {
  return (
    <IonTabs >
      <IonRouterOutlet>
        {/* <FetchedModuleContextProvider> */}
        {/* <Route exact path="/module/:id" >
            <ViewModule />
          </Route> */}
        <Route exact path="/tabs/habits">
          <Tab1 />
        </Route>
        <Route exact path="/tabs/community">
          <Tab2 />
        </Route>

        <Route exact path="/tabs">
          <Redirect to="/tabs/habits" />
        </Route>
        {/* </FetchedModuleContextProvider> */}
      </IonRouterOutlet>

      <IonTabBar className="bottom-tab-bar" style={{  backgroundColor: "var(--ion-color-light)", "--background": "var(--ion-color-light)", "--color-selected": "var(--ion-color-primary-shade)", "--color": "var(--ion-color-medium-shade)", height: "60px" }} slot="bottom" >
        <IonTabButton  tab="tab1" href="/tabs/habits">
          <IonIcon icon={home} />
          <IonLabel>Habits</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/community">
          <IonIcon icon={compass} />
          <IonLabel>Community</IonLabel>
        </IonTabButton>

      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs
