"use client";
import Link from "next/link";
import Image from "next/image";


const Navbar = () => {
    return (
        <header>
            <nav>
                <Link href="/" className="logo">
                    <Image 
                        src="/icons/logo.png"
                        alt="logo"
                        width={24}
                        height={24}
                    />
                </Link>


                <ul>
                    <Link href="/">Home</Link>
                    <Link href="/">Events</Link>
                    <Link 
                        href="/events/create"
                        className="border px-4 py-1 rounded-md border-neutral-700"
                    >
                            Create Event
                    </Link>
                </ul>
            </nav>
        </header>
    )
}


export default Navbar;