export default function Box ({box, toggleBox, playerWon}) {
    return (
        <button className="box" 
            onClick={toggleBox}
            disabled={box.active === true || playerWon}>
            {box.text}
        </button>
    )
}