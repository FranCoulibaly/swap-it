import { useContext, useEffect } from "react";
import { YarnContext } from "../contexts/YarnContext";
import LoadingElement from "../components/LoadingElement";
import { useParams } from "react-router-dom";
import YarnCard from "../components/YarnCard";



function CompaniesPage(){
    const { isLoading, searchResults, searchQuery, searchQueryFunc, fetchData } = useContext(YarnContext);
    const { companyId } = useParams();

    useEffect(() => {
        console.log("searchQuery", searchQuery);
        searchQueryFunc(companyId);
        
        // fetchData();
    }, []);
    return (
        <>
        {isLoading && <LoadingElement/>}
        <div className="align-middle min-h-[75vh]">  
        
          
        { searchResults.length === 0 & searchQuery.length > 1 ?
            <p>Nothing found</p>
            :
            <>
            { searchQuery.length > 1 && <h2 className="text-xl font-semibold text-center mb-16">{companyId}</h2>}
            <div className="yarnsContainer flex">
                
            { searchResults.map((yarn, index) => {
                if (yarn.yarn_company_name === searchQuery){
                    return (
                        <YarnCard yarn={yarn} key={index}/>
                        )}
                })
                
            }
            </div>
            </>          
        }
        </div>
        </>
    )
}

export default CompaniesPage;