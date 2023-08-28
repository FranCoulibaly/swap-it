
import { Link } from "react-router-dom"
import { useRef, useContext } from "react";
import { YarnContext } from "../contexts/YarnContext";
import SearchBar from "./SearchInput";
import logo from "../assets/logo.png"

function NavBar(){
  const navRef = useRef();
  const { searchQueryFunc} = useContext(YarnContext);

  return (
    <nav className="md:grid lg:grid-cols-6 md:grid-cols-4 gap-4 z-50 sticky" ref={navRef}>
        <Link to="/" className="col-start-1 col-end-2 w-full">
            <img className="mb-4" src={logo}/>
        </Link>
        <div className="col-end-7 col-span-2 w-fit m-auto">
          <SearchBar searchQueryFunc={searchQueryFunc}/>
        </div>
      </nav>
  )  
}

export default NavBar;