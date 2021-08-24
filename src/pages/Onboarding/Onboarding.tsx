import React, { useRef, useState } from 'react'
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonPage, IonSlide, IonSlides, IonToolbar } from '@ionic/react'
import { Heading4, Heading5, LargeParagraph, LargeButton, MediumParagraph, RowContainer, Heading3 } from '../../theme/globalStyles';
import Button from '../../components/Buttons/Button';
import "./Onboarding.css";
import Lottie from "react-lottie";
import outilAnimation from "./lottieFiles/newhabits.json"
import calendarAnimation from "./lottieFiles/calendar.json"
import stairsAnimation from "./lottieFiles/stairs.json"


const newhabitsOptions = { loop: true, animationData: outilAnimation, autoplay: true }
const calendarOptions = { loop: true, animationData: calendarAnimation, autoplay: true }
const stairsOptions = { loop: true, animationData: stairsAnimation, autoplay: true }

const Onboarding: React.FC = () => {
    const [currentIndex, currentIndexSet] = useState(0)
    const onboardingSlides = useRef<HTMLIonSlidesElement>(null);


    const handleSwipeNext = async () => {
        const swiper = await onboardingSlides.current!.getSwiper()
        swiper.slideNext()
        console.log("Link to next page")
    }

    const handleSwipeFinal = async () => {
        const swiper = await onboardingSlides.current!.getSwiper()
        swiper.slideTo(2)
        console.log("Link to next page")
    }
    // a function to handle the slider changes
    const handleSlideChange = async (event: any) => {
        let index: number = 0;
        await event.target.getActiveIndex().then((value: any) => {
            index = value
            currentIndexSet(value)
            console.log(index)
        })
        // setCurrentQuestion(index)
    }
    const slideOpts = {
        initialSlide: 0,
        slidesPerView: 1,
        speed: 400,
    };
    const [tutorialModal, setTutorialModal] = useState(true);
    return (
        <IonPage>
            {/* <IonHeader className="noborder" style={{ "--background": "transparent", "--border-style": "none" }}>

                <IonToolbar className="noborder" style={{ "--border-style": "none", "--background": "var(--ion-color-light)" }}  >
                    <IonButtons slot="end">
                        {currentIndex != 2 && <IonButton color="dark" onClick={() => handleSwipeFinal()} >
                            <MediumParagraph>

                                skip
                            </MediumParagraph>

                        </IonButton>}
                    </IonButtons>
                </IonToolbar>
            </IonHeader> */}
            <IonContent fullscreen >

                <IonSlides ref={onboardingSlides} style={{ height: "100%", width: "100%", "--bullet-background": "var(--ion-color-dark)" }} mode="ios" pager={true} options={slideOpts} onIonSlideDidChange={(e) => handleSlideChange(e)}>
                    <IonSlide  style={{ display: "flex", flexDirection: "column" }} >

                        <div className="ion-padding-horizontal">

                            <Heading4 className="ion-padding" style={{ color: "var(--ion-color-dark)" }}>
                                Create healthy habits and achieve your goals
                            </Heading4>
                            <Lottie isClickToPauseDisabled={true} options={stairsOptions} height={230} width={300} />
                            {/* <Heading5 style={{ textTransform: "uppercase" }}>
                                We can help <span style={{ color: "var(--ion-color-primary)" }}>you</span> to be a better version of <span style={{ color: "var(--ion-color-primary)" }}>yourself</span>.
                            </Heading5> */}

                        </div>

                        {/* <IonButton fill="clear" color="primary" onClick={() => handleSwipeFinal()} >
                        <MediumParagraph>
                        
                        Ignorer
                        </MediumParagraph>
                        
                    </IonButton> */}


                    </IonSlide>
                    <IonSlide  style={{ display: "flex", flexDirection: "column" }}>
                        <div className="ion-padding-horizontal">

                            <Heading4 style={{ color: "var(--ion-color-dark)" }}>
                            Track your progress, one day at a time
                            </Heading4>
                            <Lottie isClickToPauseDisabled={true} options={calendarOptions} height={230} width={300} />
                            {/* <Heading5 style={{ textTransform: "uppercase" }}>
                                We can help <span style={{ color: "var(--ion-color-primary)" }}>you</span> to be a better version of <span style={{ color: "var(--ion-color-primary)" }}>yourself</span>.
                            </Heading5> */}
                        </div>

                        {/* <RowContainer>

                            <IonButton onClick={() => handleSwipeNext()} style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" fill="clear" color="primary">
                                <LargeButton>
                                    Next
                                </LargeButton>
                            </IonButton>
                        </RowContainer> */}

                        {/* <IonButton onClick={()=> handleSwipeNext()} size="large" expand="block" color="primary">Continuer</IonButton> */}
                    </IonSlide>
                    <IonSlide style={{ display: "flex", flexDirection: "column" }}>
                        <div className="ion-padding-horizontal">

                            <Heading4  style={{ color: "var(--ion-color-dark)" }}>
                            Visualize your growth and maintain streaks
                            </Heading4>
                            <Lottie isClickToPauseDisabled={true} options={newhabitsOptions} height={230} width={300} />
                            {/* <Heading5 style={{ textTransform: "uppercase" }}>
                                We can help <span style={{ color: "var(--ion-color-primary)" }}>you</span> to be a better version of <span style={{ color: "var(--ion-color-primary)" }}>yourself</span>.
                            </Heading5> */}
                        </div>
                        {/* <IonButton routerLink="/tabs/habits" onClick={() => setTutorialModal(false)} style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" fill="solid" color="primary">
                            <LargeButton>

                                Get Started
                            </LargeButton>

                        </IonButton> */}

                    </IonSlide>

                </IonSlides>
                {currentIndex != 2 && <div className="ion-margin-top" style={{ zIndex: 99, position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", display: "flex" }}>
                    <IonButton style={{  maxWidth: "200px", "--background-hover-opacity": "0" }} color="dark" size="large" expand="block" fill="clear" onClick={() => handleSwipeFinal()} >
                        <LargeButton>

                            Skip
                        </LargeButton>

                    </IonButton>
                    <IonButton onClick={() => handleSwipeNext()} style={{  maxWidth: "200px", "--background-hover-opacity": "0" }} size="large" expand="block" fill="clear" >
                        <LargeButton>

                            Next
                        </LargeButton>

                    </IonButton>
                </div>}
                {currentIndex == 2 && <div className="ion-margin-top" style={{ zIndex: 99, position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", display: "flex" }}>
                    <IonButton style={{  maxWidth: "200px", "--background-hover-opacity": "0", visibility: "hidden" }} color="dark" size="large" expand="block" fill="clear" onClick={() => handleSwipeFinal()} >
                        <LargeButton>

                            Skip
                        </LargeButton>

                    </IonButton>
                    <IonButton  routerLink="/tabs/habits" style={{  maxWidth: "200px", "--background-hover-opacity": "0" }} size="large" expand="block" fill="clear" >
                        <LargeButton>

Start                        </LargeButton>

                    </IonButton>
                </div>}

            </IonContent>
        </IonPage>
    )
}

export default Onboarding
