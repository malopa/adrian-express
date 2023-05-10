import { createContext, useState } from "react";

export const SearchContext = createContext()

export const SearchContextProvider = ({children})=>{
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked,setClicked] = useState(false);

    return <SearchContext.Provider value={{clicked,setClicked,searchPhrase, setSearchPhrase,clicked,setClicked}}>
        {children}
    </SearchContext.Provider>
}

