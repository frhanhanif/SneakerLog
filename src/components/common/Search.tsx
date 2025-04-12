
import { SearchIcon } from "../../icons"

const Search = ({input,placeholder}:any) => {
  return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
            <span className="absolute -translate-y-1/2 
            pointer-events-none left-4 top-1/2">
                <SearchIcon/>
            </span>
            <input
                onChange={(e) => input(e.target.value)}
                type="text"
                placeholder={placeholder}
                className="h-11 w-full rounded-lg 
                py-2.5 pl-12 pr-14 text-base text
                border-gray-200 bg-transparent dark:bg-dark-900
                shadow-theme-xs placeholder:text-gray-500 
                focus:border-brand-300 focus:outline-none 
                focus:ring focus:ring-brand-500/10 
                dark:border-gray-800 
                dark:bg-gray-900 dark:bg-white/[0.03] 
                dark:placeholder:text-white/30 
                dark:focus:border-brand-800"
            />
            </div>
        </form>  
    )
}

export default Search