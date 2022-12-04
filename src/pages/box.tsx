import classNames from 'classnames';

type BoxProps = {
    boxProps : {
        letter?: string
        correct?: string
    }
}

export default function Box({boxProps}: BoxProps){
    const boxClass = classNames(
        {"bg-white": boxProps.correct === "X"},
        {"bg-green-400": boxProps.correct === "Y"},
        {"bg-red-400": boxProps.correct === "N"},
        "text-black text-3xl items-center justify-center font-bold inline-flex min-w-[80px] min-h-[80px] rounded box-border"
    );

    return (
        <div className={boxClass}>
            <div className="">{boxProps.letter}</div>
        </div>
    )
}