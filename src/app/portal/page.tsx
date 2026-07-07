"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function PortalPage() {


  const [creator, setCreator] = useState<any>(null);

  const [submissions, setSubmissions] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);





  async function loadCreator(){


    const saved = localStorage.getItem("linkedAccount");


    if(!saved){

      setLoading(false);

      return;

    }



    const account = JSON.parse(saved);



    if(!account.discord){

      setLoading(false);

      return;

    }





    const { data, error } = await supabase

      .from("creators")

      .select("*")

      .eq("discord_username", account.discord)

      .single();





    if(error){

      console.log(error);

      setLoading(false);

      return;

    }





    setCreator(data);


    localStorage.setItem(

      "linkedAccount",

      JSON.stringify({

        platform:data.platform,

        username:data.username,

        discord:data.discord_username,

        status:data.verification_code ? "Verified" : "Pending",

        verificationCode:data.verification_code

      })

    );



    loadSubmissions(data.discord_username);



    setLoading(false);


  }







  async function loadSubmissions(discord:string){


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








  useEffect(()=>{

    loadCreator();

  },[]);









  if(loading){

    return (

      <main className="min-h-screen bg-black text-white p-10">

        Loading...

      </main>

    );

  }







  if(!creator){

    return (

      <main className="min-h-screen bg-black text-white p-10">


        <div className="max-w-xl mx-auto">


          <h1 className="text-4xl font-bold">

            Creator Portal

          </h1>


          <p className="mt-5 text-gray-400">

            Please link your account first.

          </p>


        </div>


      </main>

    );

  }









  return (

    <main className="min-h-screen bg-black text-white p-10">


      <div className="max-w-3xl mx-auto">



        <h1 className="text-4xl font-bold">

          Creator Portal

        </h1>



        <p className="mt-3 text-gray-400">

          Manage your account and submissions.

        </p>








        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">



          <h2 className="text-2xl font-semibold">

            Linked Account

          </h2>




          <p className="mt-5">

            Platform:

            <span className="ml-2 text-gray-300">

              {creator.platform}

            </span>

          </p>





          <p className="mt-2">

            Username:

            <span className="ml-2 text-gray-300">

              {creator.username}

            </span>

          </p>





          <p className="mt-2">

            Discord:

            <span className="ml-2 text-gray-300">

              {creator.discord_username}

            </span>

          </p>







          <div className="mt-6 rounded-xl border border-white/10 bg-black p-4">


            <p className="font-semibold">

              Verification Status

            </p>



            {creator.verification_code ? (

              <>


                <p className="mt-2 text-green-400">

                  🟢 Account Verified

                </p>



                <p className="mt-3 text-gray-300">

                  Verification Code:

                  <span className="ml-2 font-bold text-white">

                    {creator.verification_code}

                  </span>

                </p>


              </>


            ) : (


              <p className="mt-2 text-yellow-400">

                🟡 Waiting for verification

              </p>


            )}


          </div>



        </div>









        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">


          <h2 className="text-2xl font-semibold">

            My Clip Submissions

          </h2>





          {submissions.length === 0 ? (


            <p className="mt-4 text-gray-400">

              No submissions yet.

            </p>


          ) : (



            <div className="mt-5 space-y-4">


              {submissions.map((submission)=>(


                <div

                  key={submission.id}

                  className="rounded-xl border border-white/10 bg-black p-5"

                >



                  <p>

                    <strong>Campaign:</strong>{" "}

                    {submission.campaign}

                  </p>





                  <p className="mt-2">


                    <strong>Clip:</strong>{" "}



                    <a

                      href={submission.clip_url}

                      target="_blank"

                      className="underline"

                    >

                      View Clip

                    </a>


                  </p>





                  <p className="mt-2">


                    <strong>Status:</strong>{" "}

                    {submission.status}


                  </p>





                  {submission.status === "Rejected" && (


                    <p className="mt-2 text-red-400">

                      Reason: {submission.rejection_reason}

                    </p>


                  )}





                </div>


              ))}



            </div>


          )}



        </div>






      </div>


    </main>

  );


}