import 'dotenv/config';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

type SampleEvent = {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

async function main(): Promise<void> {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not set in environment');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      // Fail fast if the server is unreachable
      serverSelectionTimeoutMS: 5000,
      // Prefer IPv4 where possible
      family: 4,
    } as mongoose.ConnectOptions);

    const sample: SampleEvent = {
      title: 'Test Event',
      slug: 'test-event',
      description: 'This is a seeded test event to verify API responses.',
      overview: 'Overview for test event',
      image: 'https://placekitten.com/800/400',
      venue: 'Online',
      location: 'Remote',
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
      mode: 'online',
      audience: 'Developers',
      agenda: ['Intro', 'Demo', 'Q&A'],
      organizer: 'Seed Script',
      tags: ['seed', 'test'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const res = await mongoose.connection.collection('events').insertOne(sample as unknown as Record<string, unknown>);
    // eslint-disable-next-line no-console
    console.log('Inserted sample event with _id =', res.insertedId.toString());
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to insert sample event:', err);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.disconnect();
    } catch (e) {
      // ignore
    }
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
