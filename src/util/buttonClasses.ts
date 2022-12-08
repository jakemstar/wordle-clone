const capLetters = "Q W E R T Y U I O P A S D F G H J K L Z X C V B N M"
const capLettersList = capLetters.split(" ");
const capLetterClassObjs =capLettersList.map(letter => { 
    return {class: letter, buttons: letter}
})

export const buttonThemes = [
    {
        class: "custom-button",
        buttons: "Q W E R T Y U I O P A S D F G H J K L {ent} Z X C V B N M {backspace}"
    }, ...capLetterClassObjs
]