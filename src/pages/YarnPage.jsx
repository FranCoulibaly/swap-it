import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { YarnContext } from "../contexts/YarnContext";
import imagePlaceholder from "../assets/imgplaceholder.png"
import LoadingElement from "../components/LoadingElement";
import YarnCard from "../components/YarnCard";
import { Link } from "react-router-dom";

function YarnPage(){

    const [showFilters, setShowFilters] = useState(false);
    const [fiberQuery, setFiberQuery] = useState("");
    const [weightQuery, setWeightQuery] = useState("");
    const [plyQuery, setPlyQuery] = useState("");
    const [constructionQuery, setConstructionQuery] = useState("");
    const [construction, setConstruction] = useState("");
    const [colorQuery, setColorQuery] = useState("");
    const [colors, setColors] = useState("");
    const [initialUrl, setInitialUrl] = useState("");
    const [filteredUrl, setFilteredUrl] = useState("");

    const navigate = useNavigate();
    const { yarnId } = useParams();
    const { isLoading, fetchSimilarYarns, fetchSingleYarn, currentYarn, similarYarn } = useContext(YarnContext);

    const handleFilters = () => {
        !showFilters ? setShowFilters(true) : setShowFilters(false);
    }

    const goBack = () => {
        navigate(-1);
    }

    const handleCheck = (e, subcheck) => {
        let insertPos = filteredUrl.indexOf(subcheck) + subcheck.length;
        if(!filteredUrl.includes(e.target.value)){
            setFilteredUrl(filteredUrl.slice(0, insertPos) + e.target.value + (filteredUrl.charAt(insertPos) !== "%" || filteredUrl.charAt(insertPos) !== "&"  ? "%2B" + filteredUrl.slice(insertPos) :filteredUrl.slice(insertPos) ));
        } else {
            if(filteredUrl.includes("%2B" + e.target.value)){
                setFilteredUrl(filteredUrl.replace("%2B" + e.target.value, ""));
            } else if (filteredUrl.includes( e.target.value + "%2B" )){
                setFilteredUrl(filteredUrl.replace(e.target.value + "%2B" , ""));
            } else {
                setFilteredUrl(filteredUrl.replace(e.target.value, ""));
            }
        }
    }
    
    const isMultiPly = (str) => {
        if (Number(str) > 5){
          return true;
        }  
    }

    const attributeSetup = () => {
        currentYarn.yarn_weight && setWeightQuery("&weight=" + currentYarn.yarn_weight.name.replace(" ", "-"));
        let fiberSetting = [];
        currentYarn.id && currentYarn.yarn_fibers.map((fiber, index) => {
            index === 0 ? fiberSetting.push(fiber.fiber_category.permalink)
            :
            fiberSetting.push(fiber.fiber_category.permalink);   
        });
        setFiberQuery("&fiber-content=" + fiberSetting.toString().replaceAll(",", "%2B"));
        if (currentYarn.yarn_weight && currentYarn.yarn_weight.ply){
            if (isMultiPly(currentYarn.yarn_weight.ply)){
                setPlyQuery("&ya=multi-ply-5");
            } else {
                setPlyQuery("&ya=" + currentYarn.yarn_weight.ply.replace(" ", "-") + "-ply");
            }
        }
        let yaSetting = "";
        let constSetting = "";
        let constAtts = [];
        let colorAtts = [];
        currentYarn.yarn_attributes && currentYarn.yarn_attributes.map((ya, index) => {
            if (ya.yarn_attribute_group.name === "Color"){
                yaSetting += ("%2B" + ya.permalink)
                colorAtts.push(" " + ya.name);
            } else if(ya.yarn_attribute_group.name === "Construction" || ya.yarn_attribute_group.name === "Novelty" ){
                constSetting += ("%2B" + ya.permalink)
                constAtts += (" " + ya.name);
            }
        });
        setConstructionQuery( constSetting);
        setConstruction(constAtts.toString())
        setColors(colorAtts.toString());
        setColorQuery( yaSetting);
        setInitialUrl(`https://api.ravelry.com/yarns/search.json?sort=projects${fiberQuery}${weightQuery}${plyQuery ? plyQuery : "&ya="}${colorQuery}${constructionQuery}`);
        setFilteredUrl(`https://api.ravelry.com/yarns/search.json?sort=projects${fiberQuery}${weightQuery}${plyQuery ? plyQuery : "&ya="}${colorQuery}${constructionQuery}`);
        initialUrl !== "https://api.ravelry.com/yarns/search.json?sort=projects&ya=" && fetchSimilarYarns(initialUrl);
    }

    useEffect(() => {
        fetchSingleYarn(yarnId);
        currentYarn.id && attributeSetup();
    }, [currentYarn.id, initialUrl]);

    useEffect(() => {
        filteredUrl !== "https://api.ravelry.com/yarns/search.json?sort=projects&ya=" && fetchSimilarYarns(filteredUrl);
       }, [filteredUrl]);
    
    return (
        <div>
             { isLoading && <LoadingElement/> } 
           {currentYarn.yarn_company && <>
            <h2 className="text-xl font-semibold">{currentYarn.name}</h2>
            <Link to={`../yarn-company/${currentYarn.yarn_company.name}`} className="text-slate-500 text-sm">from {currentYarn.yarn_company.name}</Link>
            {currentYarn.discontinued && <sub>*This yarn is discontinued</sub>}
                <div className="lg:grid gap-4 grid-cols-2 pt-16">
                   <span>
                        <img className="md:m-auto lg:m-0" src={currentYarn.photos.length > 0 ? currentYarn.photos[0].medium_url : imagePlaceholder }/>
                    </span> 
                    <span className="lg:text-left">
                        
                    {currentYarn.yarn_weight &&
                        <div className="attributeCheck lg:grid gap-1 lg:grid-cols-2 pt-2">
                            <p>Weight: {currentYarn.yarn_weight.name}</p>
                        </div>}
                    {(currentYarn.yarn_weight && currentYarn.yarn_weight.knit_gauge) &&
                        <div className="attributeCheck lg:grid gap-1 grid-cols-2 pt-2">
                            <p>Gauge: {currentYarn.yarn_weight.knit_gauge}sts/ 10cm</p>
                        </div>}
                        {currentYarn.yardage && <div className="attributeCheck lg:grid gap-2 grid-cols-2 pt-2">
                            <p>Yardage: {currentYarn.yardage} yards ({Math.round(currentYarn.yardage * 0.9144)}m) / {currentYarn.grams}g </p>
                        </div>}
                        <div className="attributeCheck lg:grid gap-1 grid-cols-2 pt-2">
                            <p>Fibers: 
                            {currentYarn.yarn_fibers.map((fiber, index) => (
                                index === 0 ? <span key={index}> {fiber.fiber_category.name}</span> 
                                : <span key={index}>, {fiber.fiber_category.name}</span> 
                            ))}</p>
                        </div>
                        {(!currentYarn.min_needle_size && !currentYarn.max_needle_size) ? ""
                        : (currentYarn.min_needle_size && currentYarn.max_needle_size) ?
                         <div className="attributeCheck lg:grid gap-2 grid-cols-2 pt-2">
                            <p>Needle size: {currentYarn.min_needle_size.name} to {currentYarn.max_needle_size.name} </p> 
                        </div> 
                        : currentYarn.min_needle_size.name ? <div className="attributeCheck lg:grid gap-2 grid-cols-2 pt-2">
                            <p>Needle size: {currentYarn.min_needle_size.name} </p> 
                        </div> 
                        : currentYarn.max_needle_size.name ? <div className="attributeCheck lg:grid gap-2 grid-cols-2 pt-2">
                        <p>Needle size: {currentYarn.max_needle_size.name} </p> 
                        </div>
                        : null 
                        }
                        
                        {(currentYarn.yarn_weight && currentYarn.yarn_weight.ply) &&<div className="attributeCheck lg:grid gap-2 grid-cols-2 pt-2">
                             <p>Ply: {currentYarn.yarn_weight.ply} ply</p>
                        </div>}
                        {colors && <div className="attributeCheck lg:grid gap-2 grid-cols-2 pt-2">
                             <p>Colour: {colors} </p>
                        </div>}
                        {(currentYarn.yarn_weight && currentYarn.yarn_weight.wpi) && <div className="attributeCheck lg:grid gap-2 grid-cols-2 pt-2">
                             <p>WPI: {currentYarn.yarn_weight.wpi}</p>
                        </div>}
                        {currentYarn.texture && <div className="attributeCheck lg:grid gap-2 grid-cols-2 pt-2 mb-6">
                            <p>Texture: {currentYarn.texture}</p>
                        </div>}
                        {constructionQuery && <div className="attributeCheck lg:grid gap-2 grid-cols-2 pt-2 mb-6">
                            <p>Construction: {construction}</p>
                            </div>}
                        <button className="mt-8 mb-4" onClick={handleFilters}>{!showFilters ? <>Show</> : <>Hide</>} Filters</button>
                        {
                        showFilters && 
                        <div>
                            <p className="mb-4">All attributes are automatically included in the search. <br/>
                            Uncheck the boxes to exclude the attribute. </p>
                            <p className="font-semibold">
                            Fibers 
                            </p>
                            {currentYarn.yarn_fibers.map((fiber, index) => (
                                <div className={`pl-2 ${index}`} key={index}> {fiber.fiber_category.name + ": "}
                                    <input type="checkbox" defaultChecked={true} name={fiber.fiber_category.permalink} 
                                     value={fiber.fiber_category.permalink} 
                                    onChange={(e) => handleCheck(e, "&fiber-content=")} 
                                    className="w-4 m-auto"/>
                                </div> 
                            ))}
                           { colorQuery && <p className="font-semibold">
                            Colours/Effects
                            </p>}
                            {currentYarn.yarn_attributes.map((ya, index) => (
                                ya.yarn_attribute_group.name === "Color" &&
                                <div className={`pl-2 ${index}`} key={index}> {ya.name + ": "}
                                    <input type="checkbox" defaultChecked={true} name={ya.permalink} 
                                     value={ya.permalink} 
                                    onChange={(e) => handleCheck(e, "&ya=")} 
                                    className="w-4 m-auto"/>
                                </div> 
                            ))}
                        </div>
                        }
                    </span>
                </div>
                <button className="bg-slate-700 border-0 text-white hover:bg-slate-800 focus:bg-slate-800 mt-16" onClick={goBack}>Back</button>
                <a className="bg-pink-600 border-0 rounded-lg text-white hover:bg-pink-800 focus:bg-pink-800 ml-8 p-3 hover:text-white" href={currentYarn.yarn_company.url} target="_blank">Shop This Yarn</a>
            </>}
           <div className="pt-16">
                <h3 className="text-xl font-semibold ">Suitable Substitutions</h3>
                <p className="mb-16">These suggestions are based on the yarns similarities, <br/>but you should always knit a yarn swatch to ensure you acheve the correct gauge for your project.</p> 
                <div className="yarnsContainer">
                    {similarYarn.length <= 1 || filteredUrl === "https://api.ravelry.com/yarns/search.json?sort=best&ya=" 
                    ? 
                    <p className="mb-16 font-semibold">We can't find any exact matches for your selection. Try changing the filter options.</p> 
                    : 
                     similarYarn && similarYarn.map((yarn, index) => {
                    if (yarn.id != currentYarn.id ){
                        return (
                        <YarnCard yarn={yarn} key={index}/>
                    )}
                    })}
                </div>
            </div>
        </div>
    )
}

export default YarnPage;