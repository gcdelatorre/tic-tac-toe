export default function Box ({box, toggleBox, gameOver}) {
    return (
        <button className="box" 
            onClick={toggleBox}
            disabled={box.active === true || gameOver}>
            {box.text}
        </button>
    )
}