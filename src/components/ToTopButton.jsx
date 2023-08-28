import { useState, useEffect } from "react";
import { RxChevronUp } from "react-icons/rx";

function ToTopButton (){
    const [showTopBtn, setShowTopBtn] = useState(false);

    const handleToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 400 ? setShowTopBtn(true) : setShowTopBtn(false);
            });
    }, []);
    return (
        <button className={`z-40 rounded-full custom p-4 text-xl bg-pink-600 text-white hover:bg-pink-800 fixed bottom-20 right-40 transition-opacity ease-in-out ${!showTopBtn ? "opacity-0" : "opacity-100" }`} disabled={!showTopBtn ? true : false}
        onClick={handleToTop}>
            <RxChevronUp/>
        </button>
    )
}

export default ToTopButton;