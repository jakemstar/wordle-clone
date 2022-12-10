const capLetters = "Q W E R T Y U I O P A S D F G H J K L Z X C V B N M"
const capLettersList = capLetters.split(" ");
const keysList = [...capLettersList]
const capLetterClassObjs = keysList.map(letter => { 
    return {class: letter, buttons: letter}
});
const capKeysClassObjs = [...capLetterClassObjs, {class: "ENT", buttons: "{ent}"}, {class: "DEL", buttons: "{backspace}"}];

export const buttonThemes = [
    {
        class: "custom-button bg-slate-50 hover:bg-slate-200 active:bg-slate-400 text-gray-900 dark:text-gray-300 dark:bg-slate-900 dark:hover:bg-slate-800 dark:active:bg-slate-700",
        buttons: "Q W E R T Y U I O P A S D F G H J K L {ent} Z X C V B N M {backspace}"
    }, ...capKeysClassObjs
]