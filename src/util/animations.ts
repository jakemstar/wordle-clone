import anime from "animejs";

export const animateAllTilesGray = () => {
    anime({
        targets: '.box',
        backgroundColor: isDarkMode() ? '#0f172a' : '#f8fafc',
        delay: anime.stagger(200, {grid: [5, 6], from: 'first'})
    });
}

export const animateSvgRotate = () => {
    return anime ({
        targets: '.resetButton>svg',
        rotateZ: 360,
        easing: 'linear',
        duration: 300
    }).finished;
}

export const animateSvgInitial = () => {
    anime ({
        targets: '.resetButton>svg',
        rotateZ: 0
    });
}

export const animateResetButtonInvisible = () => {
    anime({
        targets: '.resetButton',
        opacity: [1,0],
        easing: 'spring(.8, 90, 9, 0)',
        delay: 100,
        translateY: 0
    });
}

export const animateResetButtonVisible = () => {
    return anime({
        targets: '.resetButton',
        opacity: [0,1],
        easing: 'spring(.8, 90, 9, 0)',
        delay: 2500,
        translateY: -150
    }).finished;
}

export const animateKeysGray = () => {
    anime({
        targets: '.hg-button',
        backgroundColor: isDarkMode() ? '#0f172a' : '#f8fafc'
    });
}

export const animateKeysIn = () => {
    return anime({
        targets: '.hg-button',
        scale: [
            {value: 1, easing: 'cubicBezier(.5, .05, .5, .6)', duration: 500},
        ],
        delay: anime.stagger(250, {grid: [9, 3], from: 'center', start: 1000})
    }).finished;
}

export const animateKeysOut = () => {
    anime({
        targets: '.hg-button',
        scale: [
            {value: 0, easing: 'cubicBezier(.5, .05, .5, .6)', duration: 500},
        ],
        delay: anime.stagger(300, {grid: [9, 3], from: 'center', start: 800})
    });
}

export const animateLettersScaleOne = () => {
    anime({
        targets: '.letter',
        scale: 1
    });
}

export const animateLettersInvisible = () => {
    return anime({
        targets: '.letter',
        opacity: [1,0],
        scale: 2,
        easing: "easeOutExpo",
        delay: anime.stagger(200, {grid: [5, 6], from: 'first'})
    }).finished;
}

export const animateRowShake = (row: number) => {
    const xMax = 16;
    anime({
        targets: `.box-${row}`,
        easing: 'easeInOutSine',
        duration: 550,
        translateX: [{value: xMax * -1}, {value: xMax}, {value: xMax/-2}, {value: xMax/2}, {value: 0}]
    });
}

export const animateLetterIn = (row: number, column: number) => {
    anime({
        targets: `.letter-${row}-${column}`,
        opacity: [0,1],
        translateY: [10,0],
        easing: "easeOutExpo",
        duration: 700
    });
}

export const animateOutAnswer = () => {
    anime({
        targets: '.answer',
        easing: 'spring(.8, 90, 9, 0)',
        delay: 100,
        translateY: 0,
        opacity: [1,0]
    });
}

export const animateInAnswer = () => {
    anime({
        targets: '.answer',
        easing: 'spring(.8, 90, 9, 0)',
        delay: 100,
        translateY: 100,
        opacity: [0,1]
    });
}

export const animateLetterDelete = (row: number, column: number) => {
    return anime({
        targets: `.letter-${row}-${column}`,
        opacity: [1,0],
        translateY: [0,-10],
        easing: "easeOutExpo",
        duration: 100
    }).finished;
}

export const animateTilesColor = (row: number, column: number, color: string, delay: number) => {
    anime({
        targets: `.box-${row}-${column}`,
        backgroundColor: `${color}`,
        delay: anime.stagger(0, {start: 100 * delay})
    });
}

export const changeKeyColor = (color: string, answer: string) => {
    anime({
        targets: `.${answer}`,
        backgroundColor: `${color}`,
        easing: 'cubicBezier(.5, .05, .5, .6)',
        delay: 20 * Math.random()
    });
}

export const answerToColor = (answer: string) => {
    if(isDarkMode()) {
        if (answer === 'Y') return "#14532d"; if (answer === 'M') return "#9a3412"; if (answer === 'N') return "#9f1239"; return '#0f172a';
    } else {
        if (answer === 'Y') return "#bbf7d0"; if (answer === 'M') return "#fed7aa"; if (answer === 'N') return "#fecdd3"; return "#f8fafc";
    }
}

export const isDarkMode = () => {
    return localStorage.getItem('theme') === 'dark';
}

export const animateKeyboardThemeChange = (keyboardState: { A: string; B: string; C: string; D: string; E: string; F: string; G: string; H: string; I: string; J: string; K: string; L: string; M: string; N: string; O: string; P: string; Q: string; R: string; S: string; T: string; U: string; V: string; W: string; X: string; Y: string; Z: string; }) => {
    const alphabetArray = [...Object.keys(keyboardState), "ENT", "DEL"];
    async function asyncKeyboardThemeChange (alphabetArray: string[]) {
      for (let i = 0; i <= alphabetArray.length; i++) {
        const t = Math.random() * 60
        const x = await new Promise(r => {
          setTimeout(r, t);
          const color = answerToColor(keyboardState[alphabetArray[i] as keyof unknown ]);
          changeKeyColor(color, alphabetArray[i]!)
        });
      }
    }
    return asyncKeyboardThemeChange(alphabetArray);
  }

export  const animateTilesThemeChange = (guessesState: { guess: string; correctArray: string[]; row: number; }[]) => {
    const correctArray = guessesState.map((guess) => {return guess.correctArray});
    correctArray.forEach((answerArray, i) => {
        answerArray.forEach((answer, x) => {
            const color = (answer: string) => {
                if(isDarkMode()) {
                    if (answer === 'Y') return "#14532d"; if (answer === 'M') return "#9a3412"; if (answer === 'N') return "#9f1239"; return '#0f172a';
                } else {
                    if (answer === 'Y') return "#bbf7d0"; if (answer === 'M') return "#fed7aa"; if (answer === 'N') return "#fecdd3"; return "#f8fafc";
                }
            }
            animateTilesColor(i, x, color(answer), (x*i)/2);
        });
    });
  }