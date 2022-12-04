/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import Box from "./box"

type RowProps = {
    guessState : {
        guess: string, 
        locked: boolean
    }
}

export default function Row({guessState}: RowProps) {
    const theWord = "HELLO".split("");

    const [correctState, setCorrectState] = useState(["X", "X", "X", "X", "X"]);
    const [winState, setWinState] = useState(false);

    const guessArray: string[] = guessState.guess.split("");

    useEffect(() => {
        console.log("guess state locked");
        const correctStateCopy = Array.from(correctState);
        guessArray.forEach((guess, idx) => {
            console.log(guess === theWord[idx]);
            correctStateCopy[idx] = guess === theWord[idx] ? "Y" : "N";
        });
        setCorrectState(correctState => correctStateCopy); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guessState.locked])


    return (
        <div className="grid grid-cols-1 gap-4 grid-cols-5 gap-4">
            <Box boxProps={{letter: guessArray[0], correct: correctState[0]}}/>
            <Box boxProps={{letter: guessArray[1], correct: correctState[1]}}/>
            <Box boxProps={{letter: guessArray[2], correct: correctState[2]}}/>
            <Box boxProps={{letter: guessArray[3], correct: correctState[3]}}/>
            <Box boxProps={{letter: guessArray[4], correct: correctState[4]}}/>
        </div>
    )
}