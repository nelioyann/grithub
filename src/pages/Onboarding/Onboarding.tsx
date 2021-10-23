import React, { useRef, useState } from 'react'
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonPage, IonRouterLink, IonSlide, IonSlides, IonToolbar, useIonRouter } from '@ionic/react'
import { Heading4, Heading5, LargeParagraph, LargeButton, MediumParagraph, RowContainer, Heading3, SmallParagraph } from '../../theme/globalStyles';
import Button from '../../components/Buttons/Button';
import "./Onboarding.css";
import Lottie from "react-lottie";
import outilAnimation from "./lottieFiles/newhabits.json"
import calendarAnimation from "./lottieFiles/calendar.json"
import stairsAnimation from "./lottieFiles/stairs.json"

import buildBricks from "./Images/02.png"
import reachGoal from "./Images/09.png"
import bulbPlant from "./Images/08.png"

import newHabitMockup from "./Images/new-habit.png"
import monthGraphMockup from "./Images/month-graph.png"
import dailyHabitsMockup from "./Images/dailyHabits.png"


import { useDarkMode } from '../../Contexts/DarkModeContext';

const newhabitsOptions = { loop: true, animationData: outilAnimation, autoplay: true }
const calendarOptions = { loop: true, animationData: calendarAnimation, autoplay: true }
const stairsOptions = { loop: true, animationData: stairsAnimation, autoplay: true }

const Onboarding: React.FC = () => {
    const [currentIndex, currentIndexSet] = useState(0)
    const onboardingSlides = useRef<HTMLIonSlidesElement>(null);
    const { darkMode } = useDarkMode();

    // const themedImageFilter = darkMode ? "contrast(0) brightness(4.5)" : "contrast(1) brightness(0)";
    const themedImageFilter = "";

    const router = useIonRouter();

    const handleSwipeNext = async () => {
        const swiper = await onboardingSlides.current!.getSwiper()
        swiper.slideNext()
        // console.log("Link to next page")
    }

    const handleSwipeFinal = async () => {
        const swiper = await onboardingSlides.current!.getSwiper()
        swiper.slideTo(2)
        // console.log("Link to next page")
    }
    // a function to handle the slider changes
    const handleSlideChange = async (event: any) => {
        let index: number = 0;
        await event.target.getActiveIndex().then((value: any) => {
            index = value
            currentIndexSet(value)
            // console.log(index)
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

            <IonContent fullscreen >
                <div className="page-wrapper" style={{ alignItems: 'center', minHeight: '100vh' }}>
                    <div className="page-wrapper-content" >

                        <IonSlides ref={onboardingSlides} style={{ width: "100%", "--bullet-background": "var(--ion-color-dark)" }} mode="ios" pager={false} options={slideOpts} onIonSlideDidChange={(e) => handleSlideChange(e)}>
                            <IonSlide style={{ display: "flex", flexDirection: "column" }} >

                                <div className="ion-padding-horizontal">
                                    <Heading4 style={{ color: "var(--ion-color-dark)", padding: "1em 0", margin: "auto" }}>
                                        Create healthy habits and achieve your goals
                                    </Heading4>
                                    <div className="ion-padding " style={{ display: "flex", justifyContent: "center" }}>
                                        <img style={{ width: "clamp(100px, 100%, 34vh)", pointerEvents: "none", filter: themedImageFilter }} src={newHabitMockup} alt="Image of building bricks" />
                                    </div>
                                </div>
                                <div className="ion-margin-vertical ion-padding-horizontal" style={{ zIndex: 99, display: "grid", gridTemplateColumns: "1fr 1fr", justifyContent: "space-between" }}>

                                    <IonButton style={{ "--background-hover-opacity": "0" }} color="dark" size="large" expand="block" fill="clear" onClick={() => handleSwipeFinal()} >
                                        <LargeButton>
                                            Skip
                                        </LargeButton>

                                    </IonButton>
                                    <IonButton onClick={() => handleSwipeNext()} style={{ "--background-hover-opacity": "0" }} size="large" expand="block" fill="solid" >
                                        <LargeButton>
                                            Next
                                        </LargeButton>

                                    </IonButton>
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

                            <IonSlide style={{ display: "flex", flexDirection: "column" }}>
                                <div className="ion-padding-horizontal">
                                    <Heading4 style={{ color: "var(--ion-color-dark)", padding: "1em 0", margin: "auto" }}>
                                        Track your progress, one day at a time
                                    </Heading4>
                                    <div className="ion-padding " style={{ display: "flex", justifyContent: "center" }}>
                                        <img style={{ width: "clamp(100px, 100%, 34vh)", pointerEvents: "none", filter: themedImageFilter }} src={dailyHabitsMockup} alt="Image of the theme" />
                                    </div>
                                </div>
                                <div className="ion-margin-vertical ion-padding-horizontal" style={{ zIndex: 99, display: "grid", gridTemplateColumns: "1fr 1fr", justifyContent: "space-between" }}>

<IonButton style={{ "--background-hover-opacity": "0" }} color="dark" size="large" expand="block" fill="clear" onClick={() => handleSwipeFinal()} >
    <LargeButton>
        Skip
    </LargeButton>

</IonButton>
<IonButton onClick={() => handleSwipeNext()} style={{ "--background-hover-opacity": "0" }} size="large" expand="block" fill="solid" >
    <LargeButton>
        Next
    </LargeButton>

</IonButton>
</div>
                            </IonSlide>

                            <IonSlide style={{ display: "flex", flexDirection: "column" }}>
                                <div className="ion-padding-horizontal">
                                    <Heading4 style={{ color: "var(--ion-color-dark)", padding: "1em 0", margin: "auto" }}>
                                        Visualize your growth and maintain streaks
                                    </Heading4>
                                    <div className="ion-padding " style={{ display: "flex", justifyContent: "center" }}>
                                        <img style={{ width: "clamp(100px, 100%, 34vh)", pointerEvents: "none", filter: themedImageFilter }} src={monthGraphMockup} alt="Image of the theme" />
                                    </div>
                                </div>
                                <div className="ion-margin-vertical ion-padding-horizontal" style={{ zIndex: 99, display: "grid", gridTemplateColumns: "1fr 1fr", justifyContent: "space-between" }}>

                                    <IonButton style={{ "--background-hover-opacity": "0" }} color="dark" size="large" expand="block" fill="clear" onClick={() => handleSwipeFinal()} >
                                        <LargeButton>
                                            Skip
                                        </LargeButton>

                                    </IonButton>
                                    <IonButton onClick={() => router.push("/login", "forward", "replace")} style={{ "--background-hover-opacity": "0" }} size="large" expand="block" fill="solid" >
                                        <LargeButton>
                                            Start
                                        </LargeButton>

                                    </IonButton>
                                </div>
                            </IonSlide>

                        </IonSlides>


                        {/* {currentIndex != 2 && 
                        <div className="ion-margin-vertical" style={{ zIndex: 99, display: "grid", gridTemplateColumns: "1fr 1fr", justifyContent: "space-between" }}>

                            <IonButton style={{ "--background-hover-opacity": "0" }} color="dark" size="small" expand="block" fill="clear" onClick={() => handleSwipeFinal()} >
                                <LargeButton>
                                    Skip
                                </LargeButton>

                            </IonButton>
                            <IonButton onClick={() => handleSwipeNext()} style={{ "--background-hover-opacity": "0" }} size="small" expand="block" fill="clear" >
                                <LargeButton>
                                    Next
                                </LargeButton>

                            </IonButton>
                        </div>} */}


                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Onboarding
