import React, { Suspense } from 'react';
import EventCard from '@/components/EventCard';
import { IEvent } from '@/database';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function EventsList() {
  const response = await fetch(`${BASE_URL}/api/events`, { cache: 'no-store' });
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
