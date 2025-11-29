import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

// Helper: resolve a safe absolute URL for server-side fetches. If NEXT_PUBLIC_BASE_URL
// is provided without a protocol (or unset), normalize it and fall back to localhost.
function resolveApiUrl(path: string) {
    const raw = process.env.NEXT_PUBLIC_BASE_URL;
    let base = raw && raw.length > 0 ? raw : '';

    if (!base) {
        base = `http://localhost:${process.env.PORT ?? 3000}`;
    }

    if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(base)) {
        base = `https://${base}`;
    }

    try {
        return new URL(path, base).toString();
    } catch {
        return new URL(path, `http://localhost:${process.env.PORT ?? 3000}`).toString();
    }
}

const Page = async () => {

    'use cache';

    cacheLife('hours')

    const apiUrl = resolveApiUrl('/api/events');
    const response = await fetch(apiUrl, { cache: 'no-store' });
    const { events } = await response.json();

    return (
        <section>

            <h1 className="text-center">The Hub for Every Dev <br /> Event You Can&apos;t Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>

            <ExploreBtn />

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>

                <ul className="events">
                    {
                        events && events.length > 0 && events.map((event: IEvent) => (
                            <li key={event.title} className="list-none">
                                <EventCard {...event} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}

export default Page;