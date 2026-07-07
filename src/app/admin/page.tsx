"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function AdminPage() {


  const [creators, setCreators] = useState<any[]>([]);


  async function loadCreators(){

    const { data } = await supabase
      .from("creators")
      .select("*")
      .order("created_at", { ascending: false });


    if(data){
      setCreators(data);
    }

  }



  async function assignCode(id:string, code:string){


    await supabase
      .from("creators")
      .update({

        verification_code: code,

        status: "Verified"

      })
      .eq("id", id);



    loadCreators();


  }



  useEffect(()=>{

    loadCreators();

  },[]);



  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-5xl mx-auto">


        <h1 className="text-4xl font-bold">
          Creator Verification
        </h1>



        <div className="mt-10 space-y-5">


        {creators.map((creator)=>(


          <div
            key={creator.id}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >


            <p>
              Discord: {creator.discord_username}
            </p>


            <p>
              Platform: {creator.platform}
            </p>


            <p>
              Username: {creator.username}
            </p>


            <p>
              PayPal: {creator.paypal_email}
            </p>



            <input

              placeholder="Enter verification code"

              className="mt-4 w-full rounded-xl bg-black border border-white/10 p-3"

              onKeyDown={(e)=>{

                if(e.key==="Enter"){

                  assignCode(
                    creator.id,
                    e.currentTarget.value
                  );

                }

              }}

            />


          </div>


        ))}


        </div>


      </div>


    </main>

  );

}