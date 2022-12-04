type BoxProps = {
    boxProps : {
        letter?: string
        correct: boolean
    }
}

export default function Box({boxProps}: BoxProps){
    return (
        <div className="bg-white text-black text-3xl items-center justify-center font-bold inline-flex min-w-[80px] min-h-[80px] rounded box-border">
            <div className="">{boxProps.letter}</div>
        </div>
    )
}