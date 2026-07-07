"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function AdminSubmissions(){


  const [submissions, setSubmissions] = useState<any[]>([]);

  const [rejectReasons, setRejectReasons] = useState<any>({});



  async function loadSubmissions(){

  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending:false });



  if(error){

    console.log(error);

    return;

  }



  const pending = (data || []).filter(
    (submission)=>submission.status === "Pending"
  );


  setSubmissions(pending);

}





  async function updateSubmission(
    id:string,
    status:string
  ){


    const updateData:any = {

      status,

      reviewed_at:
      new Date().toISOString()

    };



    if(status === "Approved"){

      updateData.admin_message =
      "Your clip has been approved.";

    }



    if(status === "Rejected"){


      const reason = rejectReasons[id];


      if(!reason){

        alert("Please enter a rejection reason.");

        return;

      }


      updateData.rejection_reason = reason;

      updateData.admin_message = reason;


    }





    const { error } = await supabase
      .from("submissions")
      .update(updateData)
      .eq("id", id);



    if(error){

      console.log("UPDATE ERROR:", error);

      return;

    }



    loadSubmissions();


  }





  useEffect(()=>{

    loadSubmissions();

  },[]);







  return (

    <main className="min-h-screen bg-black text-white p-10">


      <div className="max-w-6xl mx-auto">


        <h1 className="text-4xl font-bold">
          Clip Submissions
        </h1>





        {submissions.length === 0 && (

          <p className="mt-8 text-gray-400">
            No submissions found.
          </p>

        )}






        <div className="mt-10 space-y-5">



        {submissions.map((submission)=>(


          <div

            key={submission.id}

            className="rounded-xl border border-white/10 bg-white/5 p-6"

          >


            <p>
              <strong>Creator:</strong>{" "}
              {submission.creator_discord}
            </p>




            <p>
              <strong>Campaign:</strong>{" "}
              {submission.campaign}
            </p>




            <p>
              <strong>Platform:</strong>{" "}
              {submission.platform}
            </p>





            <p className="mt-3">

              <strong>Clip:</strong>{" "}


             {submission.clip_url ? (

  submission.clip_url.startsWith("http") ? (

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

  )

) : (

  "No clip link submitted"

)}


            </p>





            <p className="mt-3">

              <strong>Status:</strong>{" "}

              {submission.status}

            </p>






            {submission.status === "Pending" && (

              <>


                <button

                  onClick={()=>updateSubmission(
                    submission.id,
                    "Approved"
                  )}

                  className="mt-5 rounded-xl bg-green-500 px-5 py-2 text-black"

                >

                  Approve

                </button>






                <input

                  value={
                    rejectReasons[submission.id] || ""
                  }

                  onChange={(e)=>

                    setRejectReasons({

                      ...rejectReasons,

                      [submission.id]:
                      e.target.value

                    })

                  }

                  placeholder="Reason for rejection"

                  className="mt-5 w-full rounded-xl bg-black border border-white/10 p-3"

                />





                <button

                  onClick={()=>updateSubmission(
                    submission.id,
                    "Rejected"
                  )}

                  className="mt-3 rounded-xl bg-red-500 px-5 py-2"

                >

                  Reject

                </button>


              </>

            )}





          </div>


        ))}



        </div>



      </div>


    </main>

  );

}