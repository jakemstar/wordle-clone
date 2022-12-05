/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from "./box"

type RowProps = {
    guessState : {
        guess: string,
        correctArray: string[],
        locked: boolean,
        row: number
    }
}

export default function Row({guessState}: RowProps) {
    const guessArray: string[] = guessState.guess.split("");

    return (
        <div className="grid grid-cols-1 gap-4 grid-cols-5 gap-4">
            <Box boxProps={{letter: guessArray[0], correct: guessState.correctArray[0], row: guessState.row, column: 0}}/>
            <Box boxProps={{letter: guessArray[1], correct: guessState.correctArray[1], row: guessState.row, column: 1}}/>
            <Box boxProps={{letter: guessArray[2], correct: guessState.correctArray[2], row: guessState.row, column: 2}}/>
            <Box boxProps={{letter: guessArray[3], correct: guessState.correctArray[3], row: guessState.row, column: 3}}/>
            <Box boxProps={{letter: guessArray[4], correct: guessState.correctArray[4], row: guessState.row, column: 4}}/>
        </div>
    )
}