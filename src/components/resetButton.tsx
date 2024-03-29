import type { MouseEventHandler } from "react";

type ResetButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>
    clickable: boolean
}

export default function ResetButton(resetButtonProps: ResetButtonProps) {
    return (
        <button style={{pointerEvents: resetButtonProps.clickable ? "all" : "none"}} onClick={resetButtonProps.onClick} className="resetButton bg-slate-50 hover:bg-slate-200 active:bg-slate-400 dark:bg-slate-900 dark:hover:bg-slate-800 dark:active:bg-slate-700 min-w-[45px] min-h-[45px] xs:min-h-[65px] xs:min-w-[65px] rounded box-border shadow-inner items-center justify-center inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </button>
    );
}