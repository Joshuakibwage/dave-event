import React, { Suspense } from 'react';
import EventCard from '@/components/EventCard';
import { IEvent } from '@/database';

// Helper: build a safe absolute URL for server-side fetches.
// If NEXT_PUBLIC_BASE_URL is provided but missing a protocol, assume https://.
function resolveApiUrl(path: string) {
  const raw = process.env.NEXT_PUBLIC_BASE_URL;
  let base = raw && raw.length > 0 ? raw : '';

  if (!base) {
    base = `http://localhost:${process.env.PORT ?? 3000}`;
  }

  // Add protocol if missing (e.g., developer set 'my-site.vercel.app')
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(base)) {
    base = `https://${base}`;
  }

  try {
    return new URL(path, base).toString();
  } catch {
    // If URL parsing still fails, fallback to localhost absolute URL
    return new URL(path, `http://localhost:${process.env.PORT ?? 3000}`).toString();
  }
}

async function EventsList() {
  const apiUrl = resolveApiUrl('/api/events');
  const response = await fetch(apiUrl, { cache: 'no-store' });
  const { events } = await response.json();

  return (
    <>
        {
            events && events.length > 0 ? (
                <ul className="events space-y-6">
                {events.map((event: IEvent) => (
                    <li key={event.slug} className="list-none">
                    <EventCard {...event} />
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No events found. Create one to get started!</p>
            )
        }
    </>
  );
}

function EventsListFallback() {
  return (
    <div className="flex justify-center items-center p-4">
      {/* <div className="h-32 w-32 bg-neutral-800 rounded animate-pulse" />
      <div className="h-32 w-32 bg-neutral-800 rounded animate-pulse" />
      <div className="h-32 w-32 bg-neutral-800 rounded animate-pulse" /> */}
      <div className="h-8 w-8 rounded-full animate-spin border-neutral-700 border-4 border-t-transparent"/>
    </div>
  );
}

const EventsPage = () => {
  return (
    <section>
      <h1 className="text-center md:mb-8 lg:mb-14 2xl:mb-16">All Events</h1>

      <Suspense fallback={<EventsListFallback />}>
        <EventsList />
      </Suspense>
    </section>
  );
};

export default EventsPage;
