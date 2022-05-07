import { IonSlide, IonButton, IonRouterLink } from '@ionic/react'
import React from 'react'
import Lottie from 'react-lottie';
import { Heading4, LargeButton, MediumParagraph } from '../../theme/globalStyles'
export interface IOnboardingSlide {
    title: string;
    imagePath: string
    handleSwipeFinal: () => void
    handleSwipeNext: () => void
    lastSlide?: boolean
    lottieOption?: any
}
const OnboardingSlide: React.FC<IOnboardingSlide> = ({ title, imagePath, handleSwipeNext, handleSwipeFinal, lastSlide, lottieOption }) => {
    return (
        <IonSlide style={{ display: "flex", flexDirection: "column" }} >
            <div className="ion-padding-horizontal">
                {/* <div className="ion-padding " style={{ display: "flex", justifyContent: "center" }}>
                    <img style={{ width: "clamp(100px, 100%, 34vh)", pointerEvents: "none" }} src={imagePath} alt="Image of building bricks" />
                </div> */}

                <Lottie isClickToPauseDisabled={true} options={lottieOption} height={200} width={300} />

                <Heading4 style={{ color: "var(--ion-color-dark)", padding: "1em", margin: "auto" }}>
                    {title}
                </Heading4>
                <div className="ion-margin-vertical " style={{ display: "grid", gridTemplateColumns: "1fr", justifyContent: "space-between" }}>
                    {/* <IonButton style={{ "--background-hover-opacity": "0" }} color="dark" size="large" expand="block" fill="clear" onClick={() => handleSwipeFinal()} >
                        <LargeButton>
                            Skip
                        </LargeButton>
                    </IonButton> */}
                    <IonButton routerLink={lastSlide ? "/login" : undefined} onClick={() => { if (lastSlide) return null; handleSwipeNext() }} style={{ "--background-hover-opacity": "0" }} size="large" expand="block" fill="solid" >
                        <LargeButton>
                            {lastSlide ? "Get started" : "Next"}
                        </LargeButton>
                    </IonButton>
                </div>
            </div>
            <MediumParagraph style={{ margin: "0.5em auto", textAlign: "center", color: "var(--ion-color-medium-primary)" }}>{"Already have an account? "}
                <IonRouterLink
                    routerLink="/login"
                    style={{ textDecoration: "underline", color: "var(--ion-color-primary)" }}
                >
                    {"Log in"}
                </IonRouterLink>
            </MediumParagraph>
        </IonSlide>
    )
}

export default OnboardingSlide
