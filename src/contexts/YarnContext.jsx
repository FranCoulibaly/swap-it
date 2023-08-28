import { createContext, useEffect, useState } from "react";
import { Buffer } from "buffer";

export const YarnContext = createContext("");

function YarnProvider({ children }){
    const [currentYarn, setCurrentYarn] = useState({});
    const [similarYarn, setSimilarYarn] = useState([]);
    const [ searchResults, setSearchResults ] = useState([]);
    const [ searchQuery, setSearchQuery ] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let username = 'read-f25f9e6de573231f03bb8ea2aa3242b5';
    let password = '00atMksVEtRR0g4NXDM0w4BV3nYxRoWoWNjPJFY2';
    const base64encodedData = Buffer.from(`${username}:${password}`).toString('base64');
    
    const searchQueryFunc = (query) => {
      setSearchQuery(query);
    }

    const fetchData = () => {
        setIsLoading(true);
        fetch(`https://api.ravelry.com/yarns/search.json?query=${searchQuery}&sort=projects`, {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64encodedData}`},
        })
        .then(res => res.json())
        .then(data => {
            setSearchResults(data.yarns);
            setIsLoading(false);
        })
        .catch(err => console.log(err));
    }
    const fetchSingleYarn = (yarnId) => {
        setIsLoading(true);  
        fetch(`https://api.ravelry.com/yarns/${yarnId}.json`, {
        method: "GET", 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64encodedData}`}
    })
    .then(res => res.json())
    .then(({yarn}) => {
        setCurrentYarn(yarn);  
        setIsLoading(false);
    })
    .catch(err => console.log(err));
    }

    const fetchSimilarYarns = (url) => {
        setIsLoading(true);       
        url && fetch(url, {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64encodedData}`}
        })
        .then(res => res.json())
        .then(({yarns}) => {
            setSimilarYarn(yarns);
            setIsLoading(false);
        })
        .catch(err => console.log(err));
    }
  
    useEffect(() => {
        fetchData();
    }, [searchQuery])

    return (
        <YarnContext.Provider 
        value={{ 
            fetchSimilarYarns, 
            fetchSingleYarn, 
            setIsLoading, 
            isLoading, 
            setSearchQuery, 
            searchQuery, 
            searchQueryFunc, 
            searchResults, 
            fetchData,
            currentYarn,
            similarYarn
        }}>
            {children}
        </YarnContext.Provider>
    )
}

export default  YarnProvider;