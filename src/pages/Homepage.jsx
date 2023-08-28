import { useContext } from "react";
import { YarnContext } from "../contexts/YarnContext";
import YarnCard from "../components/YarnCard";
import LoadingElement from "../components/LoadingElement";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Homepage(){
    const { isLoading, searchResults, searchQuery, setSearchQuery } = useContext(YarnContext);
    const navigate = useNavigate();
    const [showDescription, setShowDescription] = useState(false);
    
    const handleClick = () => {
        showDescription === false ? setShowDescription(true) : setShowDescription(false);
    }

    const handleCompany = (companyName) => {
        setSearchQuery(companyName);
        navigate(`/yarn-company/${companyName}`);
    }

    return (
        <>
        {isLoading && <LoadingElement/>}
        <div className="align-middle min-h-[75vh]">  
        {searchQuery.length === 0 && 
            <div className="mb-6">
            <p>This tool can be used to easily find yarn substitutions. </p>
            <p className="font-semibold">Get started by searching for some yarn...</p>
            <button className="mt-16 mb-8 hover:bg-slate-500 hover:text-white " onClick={handleClick}>{!showDescription ? "How to use" : "Hide"}</button>
            {
                showDescription && 
                <div>We use the large Ravelry database, of current and discontinued yarns to help you find the best yarn substitution for your projects. 
                   <br/> You can search by name, fiber type, brand or weight.    
                </div>
            }
            </div>
        }
          
        { searchResults.length === 0 & searchQuery.length > 1 ?
            <p>Nothing found</p>
            :
            <>
            { searchQuery.length > 1 && <h2 className="text-xl font-semibold text-center mb-16">{searchQuery} search results...</h2>}
            <div className="yarnsContainer flex">
                
            { searchQuery.length > 1 && searchResults.map((yarn, index) => {
                return (
                    <YarnCard yarn={yarn} key={index}/>
                )
                })
                
            }
            </div>
            </>          
        }
        </div>
        </>
    )
}

export default Homepage;