"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function AccountLinking() {


  const [platform, setPlatform] = useState("TikTok");
  const [username, setUsername] = useState("");
  const [discord, setDiscord] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  const [creator, setCreator] = useState<any>(null);

  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);



  async function checkAccount(){


    if(!discord) return;


    const { data } = await supabase
      .from("creators")
      .select("*")
      .eq("discord_username", discord)
      .single();



    if(data){

      setCreator(data);

    }


  }





  async function submitAccount(){


    if(
      !username ||
      !discord ||
      !paypalEmail
    ){

      alert("Please complete all fields before submitting.");

      return;

    }



    setLoading(true);



    const { error } = await supabase
      .from("creators")
      .insert({

        discord_username: discord,

        platform,

        username,

        paypal_email: paypalEmail,

        status: "Pending"

      });



    if(error){

      console.log(error);

      alert("Something went wrong. Please try again.");

      setLoading(false);

      return;

    }



    setSubmitted(true);

    setLoading(false);


    checkAccount();


  }





  useEffect(()=>{


    if(discord){

      checkAccount();

    }


  },[discord]);






  return (

    <main className="min-h-screen bg-black text-white p-10">


      <div className="max-w-xl mx-auto">


        <h1 className="text-4xl font-bold">
          Account Linking
        </h1>


        <p className="mt-4 text-gray-400">
          Link your social media account before submitting clips.
        </p>





        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">



          <label className="block text-gray-300">
            Social Platform
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





          <label className="mt-6 block text-gray-300">
            Social Media Username
          </label>


          <input

            required

            value={username}

            onChange={(e)=>setUsername(e.target.value)}

            placeholder="@username"

            className="mt-2 w-full rounded-xl bg-black border border-white/10 p-3"

          />





          <label className="mt-6 block text-gray-300">
            Discord Username
          </label>


          <input

            required

            value={discord}

            onChange={(e)=>setDiscord(e.target.value)}

            placeholder="Discord username"

            className="mt-2 w-full rounded-xl bg-black border border-white/10 p-3"

          />





          <label className="mt-6 block text-gray-300">
            PayPal Email
          </label>


          <input

            required

            type="email"

            value={paypalEmail}

            onChange={(e)=>setPaypalEmail(e.target.value)}

            placeholder="PayPal email used for payments"

            className="mt-2 w-full rounded-xl bg-black border border-white/10 p-3"

          />





          <button

            onClick={submitAccount}

            disabled={loading}

            className="mt-8 w-full rounded-xl bg-white py-3 text-black"

          >

            {loading
              ? "Submitting..."
              : "Submit For Verification"}

          </button>







          {(submitted || creator) && (

            <div className="mt-8 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">


              {creator?.verification_code ? (

                <>

                  <p className="font-semibold">
                    🟢 Account Verified
                  </p>


                  <p className="mt-3 text-gray-300">
                    Your verification code:
                  </p>


                  <p className="mt-2 text-2xl font-bold">
                    {creator.verification_code}
                  </p>

                </>


              ) : (

                <>

                  <p className="font-semibold">
                    🟡 Waiting for verification
                  </p>


                  <p className="mt-3 text-sm text-gray-300">

                    Your account is being reviewed. Usually takes 1 hour or less for a code back. May take longer in some cases. Come back here to check.

                  </p>


                  <p className="mt-3 text-sm text-gray-300">

                    Your verification code will appear here once assigned.

                  </p>


                </>

              )}



            </div>

          )}



        </div>


      </div>


    </main>

  );

}