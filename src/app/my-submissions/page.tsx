"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function MySubmissions(){


  const [submissions, setSubmissions] = useState<any[]>([]);

  const [discord, setDiscord] = useState("");





  async function loadSubmissions(){


    if(!discord) return;



    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("creator_discord", discord)
      .order("created_at", { ascending:false });



    if(error){

      console.log(error);

      return;

    }



    setSubmissions(data || []);


  }





  return (

    <main className="min-h-screen bg-black text-white p-10">


      <div className="max-w-4xl mx-auto">


        <h1 className="text-4xl font-bold">
          My Submissions
        </h1>


        <p className="mt-3 text-gray-400">
          Check your clip submission status and feedback.
        </p>





        <input

          value={discord}

          onChange={(e)=>setDiscord(e.target.value)}

          placeholder="Enter your Discord username"

          className="mt-8 w-full rounded-xl bg-black border border-white/10 p-3"

        />





        <button

          onClick={loadSubmissions}

          className="mt-4 rounded-xl bg-white px-6 py-3 text-black"

        >

          View Submissions

        </button>







        <div className="mt-10 space-y-5">





        {submissions.map((submission)=>(


          <div

            key={submission.id}

            className="rounded-xl border border-white/10 bg-white/5 p-6"

          >


            <p>
              <strong>Campaign:</strong>{" "}
              {submission.campaign}
            </p>

<p className="mt-2">

  <strong>Clip:</strong>{" "}

  {submission.clip_url?.startsWith("http") ? (

    <a
      href={submission.clip_url}
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
    >
      {submission.clip_url}
    </a>

  ) : (

    submission.clip_url

  )}

</p>



            <p className="mt-2">
              <strong>Status:</strong>{" "}
              {submission.status}
            </p>





            {submission.status === "Rejected" && (

              <p className="mt-3 text-red-400">

                Reason: {submission.rejection_reason}

              </p>

            )}






            {submission.status === "Approved" && (

              <p className="mt-3 text-green-400">

                Your clip has been approved!

              </p>

            )}






            {submission.status === "Pending" && (

              <p className="mt-3 text-yellow-400">

                Your clip is currently being reviewed.

              </p>

            )}




          </div>


        ))}



        </div>





      </div>


    </main>

  );

}