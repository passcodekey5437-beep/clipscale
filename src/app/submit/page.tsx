"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getData } from "@/lib/storage";


export default function SubmitClip(){


  const [account, setAccount] = useState<any>(null);

  const [discord, setDiscord] = useState("");
  const [campaign, setCampaign] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [clipUrl, setClipUrl] = useState("");

  const [submitted, setSubmitted] = useState(false);



  useEffect(()=>{

    const savedAccount = getData("linkedAccount");

    if(savedAccount){

      setAccount(savedAccount);

      setDiscord(savedAccount.discord || "");

    }

  },[]);





  async function submitClip(){


    if(
      !discord ||
      !campaign ||
      !clipUrl
    ){

      alert("Please complete all fields.");

      return;

    }



    const { error } = await supabase
      .from("submissions")
      .insert({

        creator_discord: discord,

        campaign,

        platform,

        clip_url: clipUrl,

        status: "Pending"

      });



    if(error){

      console.log(error);

      alert("Submission failed.");

      return;

    }



    setSubmitted(true);


  }






  if(!account){

    return (

      <main className="min-h-screen bg-black text-white p-10">

        <div className="max-w-xl mx-auto">

          <h1 className="text-4xl font-bold">
            Submit Clip
          </h1>

          <p className="mt-5 text-gray-400">
            Please link your account before submitting clips.
          </p>

        </div>

      </main>

    );

  }





  if(account.status !== "Verified"){

    return (

      <main className="min-h-screen bg-black text-white p-10">

        <div className="max-w-xl mx-auto">

          <h1 className="text-4xl font-bold">
            Submit Clip
          </h1>

          <p className="mt-5 text-yellow-400">
            🟡 Your account is waiting for verification.
          </p>

        </div>

      </main>

    );

  }







  return (

    <main className="min-h-screen bg-black text-white p-10">


      <div className="max-w-xl mx-auto">


        <h1 className="text-4xl font-bold">
          Submit Clip
        </h1>


        <p className="mt-4 text-gray-400">
          Submit your completed short-form content.
        </p>



        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">



          <label>
            Discord Username
          </label>

          <input

            required

            value={discord}

            onChange={(e)=>setDiscord(e.target.value)}

            placeholder="Discord username"

            className="mt-2 w-full rounded-xl bg-black border border-white/10 p-3"

          />





          <label className="mt-5 block">
            Campaign
          </label>


          <input

            required

            value={campaign}

            onChange={(e)=>setCampaign(e.target.value)}

            placeholder="Campaign name"

            className="mt-2 w-full rounded-xl bg-black border border-white/10 p-3"

          />





          <label className="mt-5 block">
            Platform
          </label>


          <select

            value={platform}

            onChange={(e)=>setPlatform(e.target.value)}

            className="mt-2 w-full rounded-xl bg-black border border-white/10 p-3"

          >

            <option>TikTok</option>
            <option>Instagram</option>
            <option>YouTube</option>

          </select>





          <label className="mt-5 block">
            Clip URL
          </label>


          <input

            required

            value={clipUrl}

            onChange={(e)=>setClipUrl(e.target.value)}

            placeholder="Paste clip link"

            className="mt-2 w-full rounded-xl bg-black border border-white/10 p-3"

          />





          <button

            onClick={submitClip}

            className="mt-8 w-full rounded-xl bg-white py-3 text-black"

          >

            Submit Clip

          </button>





          {submitted && (

            <div className="mt-6 rounded-xl bg-green-500/10 border border-green-500/20 p-4">

              ✅ Clip submitted successfully. Waiting for review.

            </div>

          )}



        </div>


      </div>


    </main>

  );

}