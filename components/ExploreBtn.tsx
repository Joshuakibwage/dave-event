"use client";
import Link from "next/link";
import Image from "next/image";


const ExploreBtn = () => {
    return (
        <button type="button" id="explore-btn"  className="mt-7 mx-auto ">
            <Link href="#events">
                Explore Events
                <Image 
                    src="/icons/arrow-down.svg"
                    alt="arrow-down"
                    width={24}
                    height={24}
                />
            </Link>
        </button>
    )
}


export default ExploreBtn;