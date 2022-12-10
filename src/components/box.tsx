type BoxProps = {
    boxProps : {
        letter?: string
        row?: number
        column?: number
    }
}

export default function Box({boxProps}: BoxProps) {
    return (
        <div className={`box box-${boxProps.row} box-${boxProps.row}-${boxProps.column} bg-slate-50 text-slate-900 text-3xl uppercase items-center justify-center font-bold inline-flex min-w-[45px] min-h-[45px] xs:min-h-[65px] xs:min-w-[65px] sm:min-h-[80px] sm:min-w-[80px] rounded box-border shadow-inner dark:bg-slate-900`}>
            <div className={`letter letter-${boxProps.row}-${boxProps.column} text-gray-900 dark:text-gray-300`}>{boxProps.letter}</div>
        </div>
    )
}