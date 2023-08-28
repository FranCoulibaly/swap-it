import { Link } from "react-router-dom";
import imagePlaceholder from "../assets/imgplaceholder.png"

function YarnCard({yarn}) {
    return (
        <div className="yarnLink ">
            <Link to={`../yarn/${yarn.id}`} reloadDocument>
                <div className="square"> <img className="m-auto md:m-" src={yarn.first_photo ? yarn.first_photo.medium_url : imagePlaceholder}/></div>
                <h3 className="text-slate-700 hover:text-slate-600">{yarn.name}</h3>
            </Link> 
            <Link to={`../yarn-company/${yarn.yarn_company_name}`} className="text-slate-500 text-sm">from {yarn.yarn_company_name}</Link>
            <br/>
            {yarn.discontinued && <sub>*This yarn is discontinued</sub>}
            
        </div>
    )
}
export default YarnCard;