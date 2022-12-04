import { useEffect, useState } from "react"
import Box from "./box"

type RowProps = {
    guessState : {
        guess: string, 
        locked: boolean
    }
}

export default function Row({guessState}: RowProps) {
    const guessArray: string[] = guessState.guess.split("");

    useEffect(() => {
        console.log("guess state locked");
        guessArray.forEach(guess => {
            console.log(guess);
        });
    }, [guessState.locked])


    return (
        <div className="grid grid-cols-1 gap-4 grid-cols-5 gap-4">
            <Box boxProps={{letter: guessArray[0], correct: false}}/>
            <Box boxProps={{letter: guessArray[1], correct: false}}/>
            <Box boxProps={{letter: guessArray[2], correct: false}}/>
            <Box boxProps={{letter: guessArray[3], correct: false}}/>
            <Box boxProps={{letter: guessArray[4], correct: false}}/>
        </div>
    )
}