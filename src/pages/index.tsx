/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import alphabet from "../alphabet.json";
import Row from "../components/row";
import words from "../sgb-words.json";
import anime from "animejs";

const Home: NextPage = () => {
  const [guessesState, setGuessesState] = useState(
    [
      {guess: "", correctArray: ["X", "X", "X", "X", "X"], locked: false, row: 0}, 
      {guess: "", correctArray: ["X", "X", "X", "X", "X"], locked: false, row: 1}, 
      {guess: "", correctArray: ["X", "X", "X", "X", "X"], locked: false, row: 2}, 
      {guess: "", correctArray: ["X", "X", "X", "X", "X"], locked: false, row: 3}, 
      {guess: "", correctArray: ["X", "X", "X", "X", "X"], locked: false, row: 4}, 
      {guess: "", correctArray: ["X", "X", "X", "X", "X"], locked: false, row: 5}
    ]
  );
  const [guessIndex, setGuessIndex] = useState(0);
  const [gamePlaying, setGamePlaying] = useState(true);
  const [winState, setWinState] = useState(false);
  const [randomWordState, setRandomWordState] = useState("");

  useEffect(() => {
    const randomWord: string = words[Math.floor(Math.random()*words.length)]!;
    setRandomWordState(randomWordState => randomWord);
    console.log(randomWord);
    //console.log("seeinghowmabytimes");
  }, []);

  useEffect(() => {
    const handleNotWordAnimation = (guessIndex: number) => {
      console.log(guessIndex);
      const xMax = 16;
      anime({
        targets: `.box-${guessIndex}`,
        easing: 'easeInOutSine',
        duration: 550,
        translateX: [{value: xMax * -1}, {value: xMax}, {value: xMax/-2}, {value: xMax/2}, {value: 0}]
      });
    }

    const handleAnimations = (guessIndex: number, correctArrayMap: string[]) => {
      correctArrayMap.forEach((answer, idx) => {
        const colorMap = correctArrayMap.map((answer) => {if (answer === 'Y') return "#bbf7d0"; if (answer === 'M') return "#fed7aa"; if (answer === 'N') return "#fecdd3"});
        anime({
          targets: `.box-${guessIndex}-${idx}`,
          backgroundColor: `${colorMap[idx]}`,
          delay: anime.stagger(0, {start: 100 * idx}),
          easing: 'cubicBezier(.5, .05, .5, .6)'
        });
      })
    }

    const handleEnterDown = (guessesStateCopy: {guess: string, correctArray: string[], locked: boolean, row: number}[]) => {
      console.log('gamelogic ' + guessesStateCopy[guessIndex]!.guess)
      if (words.includes(guessesStateCopy[guessIndex]!.guess)) {
        const correctArrayMap = guessesStateCopy[guessIndex]!.guess.split("").map((guess, idx) => {
          console.log("number of occur: " + [...randomWordState].filter(x => x === guess).length);
          if (randomWordState[idx] === guess) return "Y";
          else if (randomWordState.includes(guess)) return "M";
          else return "N";
        });
        guessesStateCopy[guessIndex] = {...guessesStateCopy[guessIndex]!, correctArray: correctArrayMap, locked: true};
        setGuessesState(guessesState => guessesStateCopy)
        if (correctArrayMap.filter((answer) => answer === "Y").length === 5) {
          console.log("Win");
          setGamePlaying(false);
          setWinState(true);
        }
        handleAnimations(guessIndex, correctArrayMap);
        guessIndex < 5 ? setGuessIndex(guessIndex => guessIndex + 1) : setGamePlaying(false);
      } else {
        handleNotWordAnimation(guessIndex);
        console.log('not in wordlist')
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gamePlaying) return;
      const lowerCaseKey = e.key.toLowerCase();
      const guessesStateCopy = Array.from(guessesState);
      const currentGuess = guessesStateCopy[guessIndex]!.guess;
      if (alphabet.includes(lowerCaseKey)) {
        guessesStateCopy[guessIndex] = {...guessesStateCopy[guessIndex]!, guess: currentGuess.concat(lowerCaseKey)};
        if (guessesState[guessIndex]!.guess.length < 5) setGuessesState(guessesState => guessesStateCopy)
      } else if ('enter' === lowerCaseKey && guessesState[guessIndex]!.guess.length === 5) {
        // console.log("ENTER");
        handleEnterDown(guessesStateCopy);
      } else if (('backspace' === lowerCaseKey || 'delete' === lowerCaseKey)) {
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-200">
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