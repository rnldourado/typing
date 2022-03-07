import { useState, useEffect } from 'react'
import "./style.css"

const Timer = (props) => {
    

    const TIME_IN_SECONDS = 60

    const [time, setTime] = useState(TIME_IN_SECONDS)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    useEffect(() => {
        if (props.startTimer === true) {
            setTimeout(() => {
                if (time === 0){
                    alert("Teste")
                    return
                }else{
                    setTime(time - 1)
                }
            }, 1000)
        }
    }, [time,props.startTimer])


    return (
        <>
            <span className="timer">{("00" + minutes).slice(-2)}:{("00" + seconds).slice(-2)}</span>
            <progress id="progess" value={time} max={TIME_IN_SECONDS}></progress>
        </>
    )
}

export { Timer };