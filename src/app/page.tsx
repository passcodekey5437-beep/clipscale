"use client";

import { campaigns } from "@/data/campaigns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getData } from "@/lib/storage";


export default function Home() {


  const [verified, setVerified] = useState(false);



  useEffect(()=>{

    const account = getData("linkedAccount");


    if(
      account &&
      account.status === "Verified"
    ){

      setVerified(true);

    }


  },[]);





  return (

    <main className="min-h-screen bg-black text-white">

      <div className="flex">


        {/* Sidebar */}

        <aside className="w-64 min-h-screen border-r border-white/10 p-6">


          <h1 className="text-2xl font-bold">
            Clip Scale
          </h1>




          <nav className="mt-10 space-y-4 text-gray-300">


            <Link href="/" className="block text-white">
              📋 Campaigns
            </Link>




            {verified && (

              <Link href="/portal" className="block">
                📤 My Submissions
              </Link>

            )}




            <Link href="/account-linking" className="block">
              🔗 Account Linking
            </Link>





            {verified && (

              <Link href="/submit" className="block">
                🎬 Submit Clip
              </Link>

            )}




          </nav>


        </aside>





        {/* Main Content */}

        <section className="flex-1 p-10">


          <h2 className="text-4xl font-bold">
            Active Campaigns
          </h2>



          <p className="mt-2 text-gray-400">
            Choose a campaign and start clipping.
          </p>





          <div className="mt-8 grid gap-6 md:grid-cols-2">


            {campaigns.map((campaign)=>(


              <div

                key={campaign.id}

                className="rounded-2xl border border-white/10 bg-white/5 p-6"

              >



                <h3 className="text-xl font-semibold">

                  {campaign.name}

                </h3>





                <p className="mt-4 text-gray-300">

                  💰 {campaign.reward}

                </p>





                <p className="text-gray-300">

                  👁 Minimum: {campaign.minimumViews}

                </p>





                <p className="mt-3 text-gray-400">

                  Platforms: {campaign.platforms.join(", ")}

                </p>





                <Link

                  href={`/campaigns/${campaign.id}`}

                  className="mt-6 inline-block rounded-xl bg-white px-5 py-2 text-black"

                >

                  View Campaign

                </Link>




              </div>


            ))}



          </div>


        </section>


      </div>


    </main>

  );

}