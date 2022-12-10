import type { MouseEventHandler } from "react";

type DarkModeButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>
    //clickable: boolean
}

function preventDefault(e: { preventDefault: () => void; }) {
    e.preventDefault();
}

export default function DarkModeButton(darkModeButtonProps: DarkModeButtonProps) {
    return (
        <button onMouseDown={preventDefault} onClick={darkModeButtonProps.onClick} className="absolute bottom-5 right-10 bg-slate-50 hover:bg-slate-200 active:bg-slate-400 dark:bg-slate-900 dark:hover:bg-slate-800 dark:active:bg-slate-700 min-w-[45px] min-h-[45px] xs:min-h-[65px] xs:min-w-[65px] rounded box-border shadow-inner items-center justify-center inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
        </button>
    );
}