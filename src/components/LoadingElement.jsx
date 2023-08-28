import imagePlaceholder from "../assets/imgplaceholder.png";
import { GiYarn } from "react-icons/gi"

function LoadingElement() {
    return (
        <div className="loadingContainer fixed flex flex-col justify-center items-center inset-x-0 inset-y-0 z-10 w-full inset-auto h-screen bg-white/75">
            <GiYarn className="text-8xl animate-[spin_3s_linear_infinite] "/>
            <h3 className="text-lg font-semibold">Loading...</h3>
        </div> 
    )
}

export default LoadingElement;