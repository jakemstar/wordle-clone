type BoxProps = {
    boxProps : {
        letter?: string
        row?: number
        column?: number
    }
}

export default function Box({boxProps}: BoxProps){
    return (
        <div className={`box-${boxProps.row} box-${boxProps.row}-${boxProps.column} bg-slate-50 text-slate-900 text-3xl uppercase items-center justify-center font-bold inline-flex min-w-[50px] min-h-[50px] sm:min-h-[80px] sm:min-w-[80px] rounded box-border shadow-inner`}>
            <div className={`letter-${boxProps.row}-${boxProps.column}`}>{boxProps.letter}</div>
        </div>
    )
}