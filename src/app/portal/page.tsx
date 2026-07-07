"use client";

import { useEffect, useState } from "react";
import { getData } from "@/lib/storage";
import { supabase } from "@/lib/supabase";


export default function PortalPage() {

  const [account, setAccount] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);



  useEffect(() => {

    const savedAccount = getData("linkedAccount");


    if(savedAccount){

      setAccount(savedAccount);

      loadSubmissions(savedAccount.discord);

    }


  }, []);





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







  return (

    <main className="min-h-screen bg-black text-white p-10">


      <div className="max-w-3xl mx-auto">


        <h1 className="text-4xl font-bold">
          Creator Portal
        </h1>


        <p className="mt-3 text-gray-400">
          Manage your account and submissions.
        </p>





        {!account ? (

          <div className="mt-8 rounded-xl bg-white/5 p-6">

            Please link your account first.

          </div>


        ) : (

          <>


          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">


            <h2 className="text-2xl font-semibold">
              Linked Account
            </h2>



            <p className="mt-5">
              Platform:

              <span className="ml-2 text-gray-300">
                {account.platform}
              </span>

            </p>



            <p className="mt-2">
              Account:

              <span className="ml-2 text-gray-300">
                {account.username}
              </span>

            </p>



            <p className="mt-2">
              Discord:

              <span className="ml-2 text-gray-300">
                {account.discord}
              </span>

            </p>





            <div className="mt-8 rounded-xl border border-white/10 bg-black p-4">


              <p className="font-semibold">
                Verification Status
              </p>


              <p className="mt-2">

                {account.status === "Verified"

                ? "🟢 Verified"

                : "🟡 Waiting for verification"

                }

              </p>




              {account.verificationCode && (

                <p className="mt-4 text-gray-300">

                  Verification Code:

                  <span className="ml-2 text-white font-bold">

                    {account.verificationCode}

                  </span>

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

                    {submission.clip_url}

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



          </>


        )}



      </div>


    </main>

  );

}