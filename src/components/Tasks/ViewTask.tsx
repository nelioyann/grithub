import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { Heading4 } from '../../theme/globalStyles'
import Header from '../Headers/Header'
import "./ViewTask.css"

const ViewTask = () => {
    const defaultState = ["0129", "0325", "0902", "0831"]
    // const calendarSquares = Array.from(Array(31 * 12).keys())
    const calendarSquares = Array.from({ length: 12 * 31 }, (_, i) => i + 1)
    return (

        <IonPage>
            <IonHeader>
                <IonToolbar color="light" >
                    <IonButtons slot="start">
                        <IonBackButton color="dark" text="" />
                    </IonButtons>
                    <IonTitle>
                        <Heading4 style={{ color: "var(--ion-color-dark)", textAlign: "left" }}> habit</Heading4>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                <div className="page-wrapper ion-padding-horizontal">

                    <div className="page-wrapper-content ">

                        <div className="graph">
                            <ul className="months">
                                <li>Jan</li>
                                <li>Feb</li>
                                <li>Mar</li>
                                <li>Apr</li>
                                <li>May</li>
                                <li>Jun</li>
                                <li>Jul</li>
                                <li>Aug</li>
                                <li>Sep</li>
                                <li>Oct</li>
                                <li>Nov</li>
                                <li>Dec</li>
                            </ul>
                            <ul className="days">
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                                <li>6</li>
                                <li>7</li>
                                <li>8</li>
                                <li>9</li>
                                <li>10</li>
                                <li>11</li>
                                <li>12</li>
                                <li>13</li>
                                <li>14</li>
                                <li>15</li>
                                <li>16</li>
                                <li>17</li>
                                <li>18</li>
                                <li>19</li>
                                <li>20</li>
                                <li>21</li>
                                <li>22</li>
                                <li>23</li>
                                <li>24</li>
                                <li>25</li>
                                <li>26</li>
                                <li>27</li>
                                <li>28</li>
                                <li>29</li>
                                <li>30</li>
                                <li>31</li>
                            </ul>
                            <ul className="squares">
                                {calendarSquares.map((index, calendarSquare) => {
                                    let month = Math.ceil(index / 31).toString().padStart(2, '0')
                                    let day = index % 31 == 0 ? "31" : (index % 31).toString().padStart(2, '0');
                                    let date = month + day;
                                    return (
                                        <li className={defaultState.includes(date) ? "completed" : ""} key={"calendarSquare" + index} data-level="${level}" data-day={day} data-month={month}>
                                            {/* {defaultState.includes(date) ? day : ""} */}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default ViewTask
