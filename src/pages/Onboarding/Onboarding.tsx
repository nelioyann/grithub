import React, { useRef, useState } from 'react'
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonPage, IonRouterLink, IonSlide, IonSlides, IonTitle, IonToolbar, useIonRouter } from '@ionic/react'
import { Heading4, Heading5, LargeParagraph, LargeButton, MediumParagraph, RowContainer, Heading3, SmallParagraph, ColumnContainer } from '../../theme/globalStyles';
import { Button } from '../../components/Buttons/Button';
import "./Onboarding.css";
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
import OnboardingSlide, { IOnboardingSlide } from './OnboardingSlide';
import Content from '../../components/Content/Content';

const newhabitsOptions = { loop: true, animationData: outilAnimation, autoplay: true }
const calendarOptions = { loop: true, animationData: calendarAnimation, autoplay: true }
const stairsOptions = { loop: true, animationData: stairsAnimation, autoplay: true }

const Onboarding: React.FC = () => {
    const [currentIndex, currentIndexSet] = useState(0)
    const onboardingSlidesRef = useRef<HTMLIonSlidesElement>(null);
    const { darkMode } = useDarkMode();

    // const themedImageFilter = darkMode ? "contrast(0) brightness(4.5)" : "contrast(1) brightness(0)";
    const themedImageFilter = "";

    const router = useIonRouter();

    const handleSwipeNext = async () => {
        const swiper = await onboardingSlidesRef.current!.getSwiper()
        swiper.slideNext()
        // console.log("Link to next page")
    }

    const handleSwipeFinal = async () => {
        const swiper = await onboardingSlidesRef.current!.getSwiper()
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
    const onboardingContentSlides: IOnboardingSlide[] = [
        {
            title: "Add new habits for achieving your goals",
            imagePath: newHabitMockup,
            lottieOption: newhabitsOptions,
            handleSwipeFinal,
            handleSwipeNext
        },
        {
            title: "Track your progress, one day at a time",
            imagePath: dailyHabitsMockup,
            lottieOption: calendarOptions,
            handleSwipeFinal,
            handleSwipeNext
        },
        {
            title: "Visualize your growth and maintain streaks",
            imagePath: monthGraphMockup,
            lottieOption: stairsOptions,

            handleSwipeFinal,
            handleSwipeNext
        },
    ]
    return (
        <IonPage>
            <IonHeader className='ion-padding'>
                <IonToolbar color="light">
                    <IonTitle>
                        <ColumnContainer style={{alignItems: "center", gap: "0.5em", justifyContent: "center"}}>

                        <svg style={{width: "2em", height: "2em"}} width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_807_893)">
                                <rect width="45" height="45" rx="7.3125" fill="#5D5FEF" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M29.941 8.02713C28.5156 8.19271 27.1138 8.88035 26.0989 9.91181L25.7887 10.2271H19.3754L12.9622 10.2271V18.5082L12.9622 26.7893L14.1247 25.6319C15.5187 24.2439 15.7519 24.1129 16.2481 24.438L16.3789 24.5237L12.3129 28.5899C8.61419 32.2888 8.25311 32.6635 8.31543 32.7387C8.47373 32.9295 8.95465 33.012 9.25571 32.9001C9.33002 32.8725 10.1943 32.0475 11.1764 31.0667L12.9622 29.2834V29.8944C12.9622 30.2304 12.9781 30.5054 12.9977 30.5054C13.0171 30.5054 14.4464 29.0944 16.1736 27.3701C19.3684 24.1806 19.4678 24.0908 19.9251 23.9884C20.148 23.9385 20.4565 23.9908 20.5172 24.0889C20.5354 24.1184 17.8278 26.8621 14.2319 30.4581C9.75044 34.9397 7.92281 36.7972 7.94304 36.85C7.98244 36.9526 8.33691 37.0395 8.57267 37.0041C9.0907 36.9265 9.15331 36.8731 11.6449 34.3856L13.9951 32.0394H14.8561H15.7171L17.5395 30.2199C19.3978 28.3647 19.5328 28.251 19.8759 28.2533C20.0423 28.2544 20.4407 28.4127 20.4407 28.4777C20.4407 28.4988 18.6179 30.3389 16.3898 32.5668C14.1618 34.7946 12.339 36.6332 12.339 36.6525C12.339 36.738 12.7581 36.895 12.9862 36.895C13.3963 36.895 13.4957 36.8099 15.9342 34.3678L18.2591 32.0394H26.5168H34.7746V25.7074V19.3754L35.194 18.9572C38.1498 16.0104 37.5705 11.0595 34.0192 8.91822C32.7977 8.18159 31.3446 7.86413 29.941 8.02713ZM31.5444 9.19761C35.4301 9.86531 37.2681 14.4143 34.9143 17.5378C31.8588 21.5922 25.4517 19.4661 25.4517 14.3978C25.4517 11.1193 28.347 8.64823 31.5444 9.19761Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_807_893">
                                    <rect width="45" height="45" rx="7.3125" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <Heading4>
                            GRITHUB
                        </Heading4>
                        
                        </ColumnContainer>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <Content>
                <div className="page-wrapper" style={{ alignItems: 'center', minHeight: '90vh' }}>

                    <div className="page-wrapper-content">


                        <IonSlides ref={onboardingSlidesRef} style={{ width: "100%", "--bullet-background": "var(--ion-color-dark)" }} mode="ios" pager={false} options={slideOpts} onIonSlideDidChange={(e) => handleSlideChange(e)}>
                            {onboardingContentSlides.map((onboardingContentSlide, index) => (
                                <OnboardingSlide
                                    key={`onboardingSlide${index}`}
                                    imagePath={onboardingContentSlide.imagePath}
                                    title={onboardingContentSlide.title}
                                    handleSwipeNext={handleSwipeNext}
                                    handleSwipeFinal={handleSwipeFinal}
                                    lottieOption={onboardingContentSlide.lottieOption}
                                    lastSlide={index + 1 === onboardingContentSlides?.length}
                                />
                            )
                            )}
                            {/* <IonSlide style={{ display: "flex", flexDirection: "column" }} >

                                <div className="ion-padding-horizontal">
                                    <Heading4 style={{ color: "var(--ion-color-dark)", padding: "1em 0", margin: "auto" }}>
                                        Add good habits for achieving your goals
                                    </Heading4>
                                    <div className="ion-padding " style={{ display: "flex", justifyContent: "center" }}>
                                        <img style={{ width: "clamp(100px, 100%, 34vh)", pointerEvents: "none", filter: themedImageFilter }} src={newHabitMockup} alt="Image of building bricks" />
                                    </div>
                                <div className="ion-margin-vertical " style={{ display: "grid", gridTemplateColumns: "1fr 1fr", justifyContent: "space-between"}}>

                                    <IonButton style={{ "--background-hover-opacity": "0" }} color="dark" size="large" expand="block" fill="clear" onClick={() => handleSwipeFinal()} >
                                        <LargeButton>
                                            Skip
                                        </LargeButton>

                                    </IonButton>
                                    <IonButton onClick={() => handleSwipeNext()} style={{ "--background-hover-opacity": "0" }} size="large" expand="block" fill="clear" >
                                        <LargeButton>
                                            Next
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
                                    <IonButton onClick={() => handleSwipeNext()} style={{ "--background-hover-opacity": "0" }} size="large" expand="block" fill="clear" >
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
                                    <IonButton onClick={() => router.push("/login", "forward", "replace")} style={{ "--background-hover-opacity": "0" }} size="large" expand="block" fill="clear" >
                                        <LargeButton>
                                            Start
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
                            </IonSlide> */}

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
            </Content>
        </IonPage>
    )
}

export default Onboarding
