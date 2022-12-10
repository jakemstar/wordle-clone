/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type NextPage } from "next";
import { useTheme } from 'next-themes';
import Head from "next/head";
import { useEffect, useState } from "react";
import Keyboard from 'react-simple-keyboard';
import Answer from "../components/answer";
import DarkModeButton from "../components/darkmodeButton";
import ResetButton from "../components/resetButton";
import Row from "../components/row";
import alphabet from "../util/alphabet.json";
import { animateAllTilesGray, animateInAnswer, animateKeyboardThemeChange, animateKeysGray, animateKeysIn, animateKeysOut, animateLetterDelete, animateLetterIn, animateLettersInvisible, animateLettersScaleOne, animateOutAnswer, animateResetButtonInvisible, animateResetButtonVisible, animateRowShake, animateSvgInitial, animateSvgRotate, animateTilesColor, animateTilesThemeChange, answerToColor, changeKeyColor, isDarkMode } from "../util/animations";
import { buttonThemes } from "../util/buttonClasses";
import words from "../util/sgb-words.json";


const Home: NextPage = () => {
  const [guessesState, setGuessesState] = useState([
    {guess: "", correctArray: ["X", "X", "X", "X", "X"], row: 0},
    {guess: "", correctArray: ["X", "X", "X", "X", "X"], row: 1},
    {guess: "", correctArray: ["X", "X", "X", "X", "X"], row: 2},
    {guess: "", correctArray: ["X", "X", "X", "X", "X"], row: 3},
    {guess: "", correctArray: ["X", "X", "X", "X", "X"], row: 4},
    {guess: "", correctArray: ["X", "X", "X", "X", "X"], row: 5}
  ]);
  const [keyboardState, setKeyboardState] = useState({
    A: "", B: "", C: "", D: "", E: "", F: "", G: "", H: "",
    I: "", J: "", K: "", L: "", M: "", N: "", O: "", P: "",
    Q: "", R: "", S: "", T: "", U: "", V: "", W: "", X: "",
    Y: "", Z: ""
  });
  const [guessIndex, setGuessIndex] = useState(0);
  const [gamePlaying, setGamePlaying] = useState(true);
  const [randomWordState, setRandomWordState] = useState("");
  const [deleteAnimationPlaying, setDeleteAnimationPlaying] = useState(false);
  const [winAnimationPlaying, setWinAnimationPlaying] = useState(false);
  const [resetAnimationPlaying, setResetAnimationPlaying] = useState(false);
  const [loseAnimationPlaying, setLoseAnimationPlaying] = useState(false);
  const [resetButtonClickable, setResetButtonClickable] = useState(false);
  const [themeChanging, setThemeChanging] = useState(false);
  const {theme, setTheme} = useTheme()

  useEffect(() => {
    const randomWord: string = words[Math.floor(Math.random()*words.length)]!;
    setRandomWordState(randomWordState => randomWord);
    console.log(randomWord);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => document.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessesState, guessIndex, deleteAnimationPlaying, keyboardState, themeChanging]);

  const handleResetLogic = () => {
    if (winAnimationPlaying) return;
    if (loseAnimationPlaying) return;
    if (resetAnimationPlaying) return;
    setResetButtonClickable(false);
    handleResetAnimation().then(() => {
      const randomWord: string = words[Math.floor(Math.random()*words.length)]!;
      setGuessesState([
        {guess: "", correctArray: ["X", "X", "X", "X", "X"], row: 0},
        {guess: "", correctArray: ["X", "X", "X", "X", "X"], row: 1},
        {guess: "", correctArray: ["X", "X", "X", "X", "X"], row: 2},
        {guess: "", correctArray: ["X", "X", "X", "X", "X"], row: 3},
        {guess: "", correctArray: ["X", "X", "X", "X", "X"], row: 4},
        {guess: "", correctArray: ["X", "X", "X", "X", "X"], row: 5}
      ]);
      setKeyboardState({
        A: "", B: "", C: "", D: "", E: "", F: "", G: "", H: "",
        I: "", J: "", K: "", L: "", M: "", N: "", O: "", P: "",
        Q: "", R: "", S: "", T: "", U: "", V: "", W: "", X: "",
        Y: "", Z: ""
      });
      setGuessIndex(0);
      setGamePlaying(true);
      setRandomWordState(randomWordState => randomWord);
      setResetAnimationPlaying(false);
      console.log(randomWord);
    });
  }

  const handleResetAnimation = () => {
    setResetAnimationPlaying(true)
    animateLettersInvisible().then(() => {
      animateLettersScaleOne();
    })
    animateAllTilesGray();
    animateSvgRotate().then(() => {
      animateSvgInitial();
    });
    animateResetButtonInvisible();
    animateKeysGray();
    return animateKeysIn();
  }

  const onKeyPress = (button: string) => {
    document.dispatchEvent(new KeyboardEvent('keydown', {
      key: button,
    }));
  }

  const handleTileColorAnimation = (guessIndex: number, correctArrayMap: string[]) => {
    correctArrayMap.forEach((answer, idx) => {
      const colorMap = isDarkMode() ? 
      correctArrayMap.map((answer) => {if (answer === 'Y') return "#14532d"; if (answer === 'M') return "#9a3412"; if (answer === 'N') return "#9f1239"}) :
      correctArrayMap.map((answer) => {if (answer === 'Y') return "#bbf7d0"; if (answer === 'M') return "#fed7aa"; if (answer === 'N') return "#fecdd3"});
      animateTilesColor(guessIndex, idx, colorMap[idx]!, idx);
    });
  }

  const handleDeleteAnimation = (row: number, column: number) => {
    setDeleteAnimationPlaying(true);
    return animateLetterDelete(row, column);
  }

  const handleLoseAnimation = () => {
    animateInAnswer();
    animateKeysOut();
    return animateResetButtonVisible();
  }

  const handleWinAnimation = () => {
    setWinAnimationPlaying(true);
    for (let i = guessIndex; i < 6; i++){
      for (let x = 0; x < 5; x++){
        isDarkMode() ?
        animateTilesColor(i, x, "#14532d", (x*i)/2) :
        animateTilesColor(i, x, "#bbf7d0", (x*i)/2);
      }
    }
    animateKeysOut();
    return animateResetButtonVisible();
  }
  
  const handleKeyColors = (correctArray: { guess: string; correct: string; }[]) => {
    const newKeyboardState = keyboardState;
    correctArray.forEach((answer) => {
      const currentAnswer = answer.guess.toUpperCase() as keyof typeof newKeyboardState;
      if (answer.correct === 'Y' && !(newKeyboardState[currentAnswer] === "Y")) {
        newKeyboardState[currentAnswer] = 'Y';
        changeKeyColor(isDarkMode() ? "#14532d" : "#bbf7d0", currentAnswer);
      } else if (answer.correct === 'M' && !(newKeyboardState[currentAnswer] === "Y")) {
        newKeyboardState[currentAnswer] = 'M';
        changeKeyColor(isDarkMode() ? "#9a3412" : "#fed7aa", currentAnswer);
      } else if (answer.correct === 'N' && !(newKeyboardState[currentAnswer] === "Y") && !(newKeyboardState[currentAnswer] === "M")) {
        newKeyboardState[currentAnswer] = 'N';
        changeKeyColor(isDarkMode() ? "#9f1239" : "#fecdd3", currentAnswer);
      }
    });
    setKeyboardState(keyboardState => newKeyboardState);
  }

  const createCorrectArrayMap = (guess: string) => {
    const guessArray = guess.split("");
    const reverseCorrectArray = guessArray.map((guess, idx) => {
      if (randomWordState[idx] === guess) return {guess, correct: "Y"};
      else if (randomWordState.includes(guess)) return {guess, correct: "M"};
      else return {guess, correct: "N"};
    });
    reverseCorrectArray.reverse();
    const correctArray: { guess: string; correct: string; }[] = [];
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
    const colorArray = correctArray.reverse().map((guess: {guess: string; correct: string;}) => {
      return guess.correct;
    });
    handleKeyColors(correctArray);
    return colorArray;
  }

  const inWordList = (word: string) => {
    return words.includes(word);
  }

  const handleEnterDown = (guessesStateCopy: {guess: string, correctArray: string[], row: number}[]) => {
    if (inWordList(guessesStateCopy[guessIndex]!.guess) && guessesState[guessIndex]!.guess.length === 5) {
      const correctArrayMap = createCorrectArrayMap(guessesStateCopy[guessIndex]!.guess);
      guessesStateCopy[guessIndex] = {...guessesStateCopy[guessIndex]!, correctArray: correctArrayMap};
      setGuessesState(guessesState => guessesStateCopy);
      if (correctArrayMap.filter((answer) => answer === "Y").length === 5) {
        setGamePlaying(false);
        handleWinAnimation().then(() => {setWinAnimationPlaying(false); setResetButtonClickable(true);});
      } else {
        handleTileColorAnimation(guessIndex, correctArrayMap);
        if (guessIndex === 5) {
          setLoseAnimationPlaying(true);
          handleLoseAnimation().then(() => {setLoseAnimationPlaying(false); setResetButtonClickable(true); animateOutAnswer();});
          setGamePlaying(false);
        }
      }
      guessIndex < 5 ? setGuessIndex(guessIndex => guessIndex + 1) : setGamePlaying(false);
    } else {
        animateRowShake(guessIndex);
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (themeChanging) return;
    if (!gamePlaying) return;
    if (deleteAnimationPlaying) return;
    const lowerCaseKey = e.key.toLowerCase();
    const guessesStateCopy = Array.from(guessesState);
    const currentGuess = guessesStateCopy[guessIndex]!.guess;
    if (alphabet.includes(lowerCaseKey)) {
      guessesStateCopy[guessIndex] = {...guessesStateCopy[guessIndex]!, guess: currentGuess.concat(lowerCaseKey)};
      if (guessesState[guessIndex]!.guess.length < 5) {
        animateLetterIn(guessIndex, guessesState[guessIndex]!.guess.length);
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
    }
  }

  const animateThemeChange = (guessesState: { guess: string; correctArray: string[]; row: number; }[], keyboardState: { A: string; B: string; C: string; D: string; E: string; F: string; G: string; H: string; I: string; J: string; K: string; L: string; M: string; N: string; O: string; P: string; Q: string; R: string; S: string; T: string; U: string; V: string; W: string; X: string; Y: string; Z: string; }) => {
    animateTilesThemeChange(guessesState);
    animateKeyboardThemeChange(keyboardState).then(() => setThemeChanging(false));
  }

  const handleThemeChange = () => {
    if (themeChanging) return;
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setThemeChanging(true);
    animateThemeChange(guessesState, keyboardState);
  }

  return (
    <>
      <Head>
        <title>Wordle Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-700">
        <div className="flex flex-col items-center justify-center w-11/12 gap-2 xs:w-10/12 md:w-auto sm:gap-4">
          <DarkModeButton onClick={handleThemeChange} />
          <Answer word={randomWordState} />
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
          <ResetButton onClick={handleResetLogic} clickable={resetButtonClickable} />
        </div>
      </main>
    </>
  );
};

export default Home;