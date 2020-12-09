import React from "react";
import swal from 'sweetalert';
import stylesBootstrap from "./bootstrap.css";
import styles from './resources.css';

import BoxComponent from "./BoxComponent";
const { useState } = React;
function App() {
    const [side, setSide] = useState(1);
    const [tossed, setTossed] = useState(0);
    const [size, setSize] = useState(2);
    const [timmer, setTimmer] = useState(0);
    const [isPlayGame, setIsPlayGame] = useState(false);
    const [autoColorBoxCount, setAutoColorBoxCount] = useState(2);
    const tossCoin = () => {
        const landedOn = Math.round(Math.random())
        setSide(landedOn)
        setTossed(tossed + 1)
    }
    const handlePlayeGame = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (size >= 2 && timmer !== 0) {
            setIsPlayGame(true);
            setAutoColorBoxCount(Math.round(size * size / 2));
        }
        else {
            swal({
                title: "Alert",
                icon: "warning",
                text: "Please Enter correct Information",
                dangerMode: true
            });
            return;
        }
    }
    const handleModeChange = (e) => {
        e.preventDefault();
        if (e.target.value > 0) {
            if (e.target.name === 'matrixCount') {
                setSize(e.target.value);
                setAutoColorBoxCount(Math.round(e.target.value * e.target.value / 2));
            }
            else {
                setTimmer(e.target.value)
            }
        }
    }
    const handleBackbutton = () => {
        setIsPlayGame(false);
    }

    return (
        <div>
            {!isPlayGame ?
                <div className={`${styles.container} ${stylesBootstrap.jumbotron}`} id="container">
                    <h3>{`Please Enter below Information ${'\u2728'}`}</h3>
                    {tossed === 0 && <form>
                        <label style={{ width: "10%" }}>{`Matrix Box Size:`}</label> <input name="matrixCount" max={2000} min={2} placeholder="Enter Number How Many row/column(s) you want"
                            style={{ width: "21%" }}
                            type="Number" onChange={(e) => handleModeChange(e)} value={size}></input>
                        <label style={{ width: "20%" }}>{`Should be greater than 2`}</label>
                        <br /><br />
                        <label style={{ width: "10%" }}>{`Auto Box Size:`}</label> <input name="matrixAutoColorBoxCount" readOnly={true}
                            style={{ width: "21%" }}
                            type="Number" value={autoColorBoxCount}></input>
                        <label style={{ width: "20%" }}>{`This is auto calculated (Row Size*column Size)/2`}</label>
                        <br /><br />
                        <label style={{ width: "10%" }}>{`Time for Computer:`}</label> <input style={{ width: "21%" }} name="timer" placeholder="Please enter timer" type="Number" max={100} min={0}
                            onChange={(e) => handleModeChange(e)} value={timmer}></input>
                        <label style={{ width: "20%" }}>{`Should be greater than 0`}</label>
                        <br /><br />
                    </form>
                    }
                    <button onClick={handlePlayeGame}>Play Game</button>
                </div> :
                <div className={`${styles.container} ${stylesBootstrap.jumbotron}`} id="container">
                    <h3>Play Game</h3>
                    <BoxComponent interval={parseInt(timmer)} num={parseInt(size)} autoColorBoxCount={parseInt(autoColorBoxCount)} />
                    <br /><br />
                    <button onClick={handleBackbutton}>Back </button>
                </div>
            }
        </div>
    );
}
export default App