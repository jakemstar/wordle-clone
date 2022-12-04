/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Row from "./row";
import alphabet from "../alphabet.json";

const Home: NextPage = () => {
  const [guessesState, setGuessesState] = useState(
    [
      {guess: "", locked: false}, 
      {guess: "", locked: false}, 
      {guess: "", locked: false}, 
      {guess: "", locked: false}, 
      {guess: "", locked: false}, 
      {guess: "", locked: false}
    ]
  );
  const [guessIndex, setGuessIndex] = useState(0);
  const [gamePlaying, setGamePlaying] = useState(true);

  useEffect(() => {
    console.log("GAMEPLAYING" +gamePlaying);
  }, [gamePlaying]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const upperCaseKey = e.key.toUpperCase();
      const guessesStateCopy = Array.from(guessesState);
      const currentGuess = guessesStateCopy[guessIndex]!.guess;
      if (alphabet.includes(upperCaseKey)) {
        guessesStateCopy[guessIndex] = {...guessesStateCopy[guessIndex]!, guess: currentGuess.concat(upperCaseKey)};
        if (guessesState[guessIndex]!.guess.length < 5) setGuessesState(guessesState => guessesStateCopy)
      } else if ('ENTER' === upperCaseKey && guessesState[guessIndex]!.guess.length === 5) {
        console.log("ENTER");
        guessesStateCopy[guessIndex] = {...guessesStateCopy[guessIndex]!, locked: true};
        setGuessesState(guessesState => guessesStateCopy)
        guessIndex < 5 ? setGuessIndex(guessIndex => guessIndex + 1) : setGamePlaying(false);
      } else if (('BACKSPACE' === upperCaseKey || 'DELETE' === upperCaseKey) && gamePlaying) {
        guessesStateCopy[guessIndex] = {...guessesStateCopy[guessIndex]!, guess: currentGuess.slice(0, -1)};
        setGuessesState(guessesState => guessesStateCopy);
      }
      console.log(gamePlaying);
      console.log(guessesState);
    }
    document.addEventListener('keydown', handleKeyDown, false);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [guessesState, guessIndex]);

  return (
    <>
      <Head>
        <title>Wordle Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-4">
          <Row guessState={guessesState[0]!}/>
          <Row guessState={guessesState[1]!}/>
          <Row guessState={guessesState[2]!}/>
          <Row guessState={guessesState[3]!}/>
          <Row guessState={guessesState[4]!}/>
          <Row guessState={guessesState[5]!}/>
        </div>
      </main>
    </>
  );
};

export default Home;
