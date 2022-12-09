type AnswerProps = {
    word: string
}

export default function Answer(answerProps: AnswerProps) {
    return (
        <div style={{zIndex: 1, position: "absolute", top: 0, opacity: 0}} className="answer bg-neutral-800 text-slate-50 text-3xl uppercase items-center justify-center font-bold inline-flex rounded box-border shadow-inner p-5">
            {answerProps.word}
        </div>
    )
}