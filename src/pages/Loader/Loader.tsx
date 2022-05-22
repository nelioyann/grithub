import { IonCard, IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Lottie from "react-lottie";
import Content from '../../components/Content/Content';
import loadingGearsAnimation from "./loadingGears.json"

const loadingGearsOptions = { loop: true, animationData: loadingGearsAnimation, autoplay: true }

const Loader = () => {
    return (
        <IonPage>
            <Content>
                <div className="page-wrapper ion-padding-horizontal" style={{ alignItems: 'center', height: '100%', overflow: 'hidden' }}>
                    <div className="page-wrapper-content">
                        <IonCard mode="ios" style={{ width: "max-content", margin: "auto", borderRadius: "50%" }}>
                            <Lottie isClickToPauseDisabled={true} options={loadingGearsOptions} height={230} width={230} />
                        </IonCard>
                    </div>
                </div>
            </Content>

        </IonPage>
    )
}

export default Loader
