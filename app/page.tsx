"use client";
import ExploreBtn from "@/components/ExploreBtn";


const Home = () => {
  return (
    <section>
      <h1 className="text-center">The Hub for every Dev <br /> Event you can&apos;t miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups and Conferences, All in one place!</p>
      
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <ul>
          {
            [1,2,3,4,5,6,7].map((item, index) => (
              <li key={index}>{item}</li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}


export default Home;