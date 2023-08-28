import { useState, useContext } from "react";
import { YarnContext } from "../contexts/YarnContext";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";


function SearchBar(){
    const [search, setSearch] = useState("");
    const [focused, setFocused] = useState(false);
    const { searchQueryFunc, setSearchQuery, searchQuery } = useContext(YarnContext);
    
    const navigate = useNavigate();

    const onClear = () => {
        setSearch("");
        setSearchQuery("");
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        searchQueryFunc(search);
        navigate("/")

    }
    
    return (
        <form onSubmit={handleSubmit} className="align-middle">
            <input className="p-2 pr-0 border rounded-r-none mr-0 border-r-0 border-slate-300 rounded-md focus:border-slate-400 focus:text-white focus:bg-slate-400 placeholder-shown:border-slate-300" 
            onFocus={(e) => {
                setFocused(true);}} 
            onBlur={(e) => {
                 setFocused(false);}} 
                onChange={handleChange} placeholder="Search..."
                value={search}/>
                <span>
             <button className={`p-2 pl-0 border text-white rounded-l-none ml-0 mr-2 border-l-0 border-slate-300 hover:text-black rounded-md ${focused && "bg-slate-400 border-slate-400"}` } 
             onClick={onClear} 
             disabled={!search ? true : false}
             type="reset" >
                <span className={`${!search ? "invisible" : "visible"} ${!focused && "text-black"} `}><RxCross2 className="inline"/></span>
             </button>
             </span>
            <button className="bg-slate-700 border-0 text-white hover:bg-slate-800 focus:bg-slate-800" type="submit">Search</button>
        </form>
    )
}

export default SearchBar;