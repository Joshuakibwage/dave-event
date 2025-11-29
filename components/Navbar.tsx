"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";


const navItems = [
{ label: "Home", href: "/" },
{ label: "Events", href: "/events" },
{ label: "Create Event", href: "/events/create" }
];



const Navbar = () => {

    const pathname = usePathname();
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

                    <p>
                        Dev Event
                    </p>
                </Link>


                <div className="flex gap-4">
                   {
                        navItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <div key={index}>
                                    <Link href={item.href} className={`transition ${
                                        isActive ? "text-[#27B7F5]" : "text-white hover:text-[#18ADED]"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            )
                        })
                   }
                </div>
            </nav>
        </header>
    )
}


export default Navbar;