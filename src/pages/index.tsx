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
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { buttonThemes } from "../buttonClasses";

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
  const [keyboardState, setKeyboardState] = useState(
    {
      A: "", B: "", C: "", D: "", E: "", F: "", G: "", H: "", 
      I: "", J: "", K: "", L: "", M: "", N: "", O: "", P: "", 
      Q: "", R: "", S: "", T: "", U: "", V: "", W: "", X: "", 
      Y: "", Z: ""
    }
  );
  const [guessIndex, setGuessIndex] = useState(0);
  const [gamePlaying, setGamePlaying] = useState(true);
  const [randomWordState, setRandomWordState] = useState("");
  const [deleteAnimationPlaying, setDeleteAnimationPlaying] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onKeyPress = (button: any) => {
    document.dispatchEvent(new KeyboardEvent('keydown', {
      key: button,
    }));
  }

  useEffect(() => {
    const randomWord: string = words[Math.floor(Math.random()*words.length)]!;
    setRandomWordState(randomWordState => randomWord);
    console.log(randomWord);
    //console.log("seeinghowmabytimes");
  }, []);

  useEffect(() => {
    const handleNotWordAnimation = (guessIndex: number) => {
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

    const handleLetterAnimations = (row: number, column: number) => {
      anime({
        targets: `.letter-${row}-${column}`,
        opacity: [0,1],
        translateY: [10,0],
        easing: "easeOutExpo",
        duration: 700,
      })
    }

    const handleDeleteAnimation = (row: number, column: number) => {
      setDeleteAnimationPlaying(true);
      return anime({
        targets: `.letter-${row}-${column}`,
        opacity: [1,0],
        translateY: [0,-10],
        easing: "easeOutExpo",
        duration: 100,
      }).finished;
    }

    const handleWinAnimation = () => {
      const currentIndex = guessIndex;
      for (let i = currentIndex; i < 6; i++){
        for (let x = 0; x < 5; x++){
          anime({
            targets: `.box-${i}-${x}`,
            backgroundColor: "#bbf7d0",
            delay: anime.stagger(0, {start: 100 * x * i}),
            easing: 'cubicBezier(.5, .05, .5, .6)'
          });
        }
      }
    }
    
    const handleKeyColors = (correctArray: { guess: string; correct: string; }[]) => {
      console.log(correctArray);
      correctArray.forEach((answer) => {
        const newKeyboardState = keyboardState;
        const currentAnswer = answer.guess.toUpperCase() as keyof typeof newKeyboardState;
        if (answer.correct === 'Y' && !(newKeyboardState[currentAnswer] === "Y")) {
          newKeyboardState[currentAnswer] = 'Y';
          anime({
            targets: `.${answer.guess.toUpperCase()}`,
            backgroundColor: "#bbf7d0",
            easing: 'cubicBezier(.5, .05, .5, .6)'
          });
        } else if (answer.correct === 'M' && !(newKeyboardState[currentAnswer] === "Y")) {
          newKeyboardState[currentAnswer] = 'M';
          anime({
            targets: `.${answer.guess.toUpperCase()}`,
            backgroundColor: "#fed7aa",
            easing: 'cubicBezier(.5, .05, .5, .6)'
          });
        } else if (answer.correct === 'N' && !(newKeyboardState[currentAnswer] === "Y") && !(newKeyboardState[currentAnswer] === "M")) {
          newKeyboardState[currentAnswer] = 'N';
          anime({
            targets: `.${answer.guess.toUpperCase()}`,
            backgroundColor: "#fecdd3",
            easing: 'cubicBezier(.5, .05, .5, .6)'
          });
        }
      })
      console.log(keyboardState);
    }

    const createCorrectArrayMap = (guess: string) => {
      const guessArray = guess.split("");
      const reverseCorrectArray = guessArray.map((guess, idx) => {
        if (randomWordState[idx] === guess) return {guess, correct: "Y"};
        else if (randomWordState.includes(guess)) return {guess, correct: "M"};
        else return {guess, correct: "N"};
      });
      reverseCorrectArray.reverse();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-const
      let correctArray: { guess: string; correct: string; }[] = [];
      reverseCorrectArray.forEach((letterGuess, idx) => {
        if (letterGuess.correct === "M") {
          const countLetterInWord = [...randomWordState].filter(x => x === letterGuess.guess).length;
          const countLetterStatusY = reverseCorrectArray.filter(x => x.guess === letterGuess.guess && x.correct === "Y").length;
          const countLetterStatusYMLeft = reverseCorrectArray.slice(idx).filter(x => x.guess === letterGuess.guess && (x.correct === "Y" || x.correct === "M")).length;
          if (countLetterStatusY >= countLetterInWord) {
            correctArray.push({guess: letterGuess.guess, correct: "N"});
          } else if (countLetterStatusYMLeft > countLetterInWord) {
            correctArray.push({guess: letterGuess.guess, correct: "N"});
          } else {
            correctArray.push(letterGuess);
          }
        } else {
          correctArray.push(letterGuess);
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const something = correctArray.reverse().map((guess: any) => {
        return guess.correct
      });
      handleKeyColors(correctArray);
      return something
    }

    const inWordList = (word: string) => {
      return words.includes(word);
    }

    const handleEnterDown = (guessesStateCopy: {guess: string, correctArray: string[], locked: boolean, row: number}[]) => {
      //console.log('gamelogic ' + guessesStateCopy[guessIndex]!.guess)
      if (inWordList(guessesStateCopy[guessIndex]!.guess) && guessesState[guessIndex]!.guess.length === 5) {
        const correctArrayMap = createCorrectArrayMap(guessesStateCopy[guessIndex]!.guess)
        guessesStateCopy[guessIndex] = {...guessesStateCopy[guessIndex]!, correctArray: correctArrayMap, locked: true};
        setGuessesState(guessesState => guessesStateCopy)
        if (correctArrayMap.filter((answer) => answer === "Y").length === 5) {
          //console.log("Win");
          setGamePlaying(false);
          handleWinAnimation();
        } else {
          handleAnimations(guessIndex, correctArrayMap);
        }
        guessIndex < 5 ? setGuessIndex(guessIndex => guessIndex + 1) : setGamePlaying(false);
      } else {
        handleNotWordAnimation(guessIndex);
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gamePlaying) return;
      if (!deleteAnimationPlaying) {
      const lowerCaseKey = e.key.toLowerCase();
      const guessesStateCopy = Array.from(guessesState);
      const currentGuess = guessesStateCopy[guessIndex]!.guess;
      if (alphabet.includes(lowerCaseKey)) {
        guessesStateCopy[guessIndex] = {...guessesStateCopy[guessIndex]!, guess: currentGuess.concat(lowerCaseKey)};
        if (guessesState[guessIndex]!.guess.length < 5) {
          handleLetterAnimations(guessIndex, guessesState[guessIndex]!.guess.length);
          setGuessesState(guessesState => guessesStateCopy)
        }
      } else if ("enter" === lowerCaseKey || "{ent}" === lowerCaseKey) {
        handleEnterDown(guessesStateCopy);
      } else if ((("backspace" === lowerCaseKey || "delete" === lowerCaseKey || "{backspace}" === lowerCaseKey) && !deleteAnimationPlaying)) {
        handleDeleteAnimation(guessIndex, guessesState[guessIndex]!.guess.length-1).then(() => {
          guessesStateCopy[guessIndex] = {...guessesStateCopy[guessIndex]!, guess: currentGuess.slice(0, -1)};
          setGuessesState(guessesState => guessesStateCopy);
          setDeleteAnimationPlaying(false);
        })
      }}
      //console.log(gamePlaying);
      //console.log(guessesState);
    }
    document.addEventListener("keydown", handleKeyDown, false);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [guessesState, guessIndex, deleteAnimationPlaying, keyboardState]);

  return (
    <>
      <Head>
        <title>Wordle Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-200">
        <div className="w-11/12 xs:w-10/12 md:w-auto flex flex-col items-center justify-center gap-2 sm:gap-4">
          <Row guessState={guessesState[0]!} />
          <Row guessState={guessesState[1]!} />
          <Row guessState={guessesState[2]!} />
          <Row guessState={guessesState[3]!} />
          <Row guessState={guessesState[4]!} />
          <Row guessState={guessesState[5]!} />
          <Keyboard 
            onKeyPress={onKeyPress}           
            layout={{
              default: [
                "Q W E R T Y U I O P",
                "A S D F G H J K L",
                "{ent} Z X C V B N M {backspace}",
              ]
            }}
            display={{
              "{ent}": "enter",
              "{backspace}": "←"
            }}
            theme="hg-theme-default custom-keyboard"
            buttonTheme={buttonThemes}
          />
        </div>
      </main>
    </>
  );
};

export default Home;