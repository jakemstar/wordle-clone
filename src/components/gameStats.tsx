type ResetButtonProps = {
    visible: boolean
    randomWordState: string
    guessIndex: number
    gamePlaying: boolean
    hiddenAnswerState: string
    deleteAnimationPlaying: boolean
    notWordAnimationPlaying: boolean
    winAnimationPlaying: boolean
    resetAnimationPlaying: boolean
    loseAnimationPlaying: boolean
    resetButtonClickable: boolean
    themeChanging: boolean
    guessesState: {guess: string, correctArray: string[], row: number}[]
}

export default function DebugStats(props: ResetButtonProps) {
    if (props.visible){
        return (
            <>
                <div className="topLeft">
                    <p>randomWordState: {props.randomWordState}</p>
                    <p>guessIndex: {props.guessIndex}</p>
                    <p>gamePlaying: {props.gamePlaying ? "true" : "false"}</p>
                    <p>deleteAnimationPlaying: {props.deleteAnimationPlaying ? "true" : "false"}</p>
                    <p>notWordAnimationPlaying: {props.notWordAnimationPlaying ? "true" : "false"}</p>
                    <p>winAnimationPlaying: {props.winAnimationPlaying ? "true" : "false"}</p>
                    <p>resetAnimationPlaying: {props.resetAnimationPlaying ? "true" : "false"}</p>
                    <p>loseAnimationPlaying: {props.loseAnimationPlaying ? "true" : "false"}</p>
                    <p>resetButtonClickable: {props.resetButtonClickable ? "true" : "false"}</p>
                    <p>Theme change anim playing: {props.themeChanging ? "true" : "false"}</p>
                    <p>Guess 0: {props.guessesState[0]?.guess}, correct array 0: {props.guessesState[0]?.correctArray}</p>
                    <p>Guess 1: {props.guessesState[1]?.guess}, correct array 1: {props.guessesState[1]?.correctArray}</p>
                    <p>Guess 2: {props.guessesState[2]?.guess}, correct array 2: {props.guessesState[2]?.correctArray}</p>
                    <p>Guess 3: {props.guessesState[3]?.guess}, correct array 3: {props.guessesState[3]?.correctArray}</p>
                    <p>Guess 4: {props.guessesState[4]?.guess}, correct array 4: {props.guessesState[4]?.correctArray}</p>
                    <p>Guess 5: {props.guessesState[5]?.guess}, correct array 5: {props.guessesState[5]?.correctArray}</p>
                </div>
            </>
        );
    }
    return <></>
}