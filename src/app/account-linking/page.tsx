"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { saveData, getData } from "@/lib/storage";


export default function AccountLinking() {


  const [platform,setPlatform] = useState("TikTok");
  const [username,setUsername] = useState("");
  const [discord,setDiscord] = useState("");
  const [paypalEmail,setPaypalEmail] = useState("");

  const [creator,setCreator] = useState<any>(null);

  const [submitted,setSubmitted] = useState(false);

  const [loading,setLoading] = useState(false);



  async function checkAccount(){


    if(!discord) return;


    const {data,error}=await supabase
  .from("creators")
  .select("*")
  .eq("discord_username",discord)
  .maybeSingle();



    if(error){

  console.log("CHECK ACCOUNT ERROR:", error);

  return;

}

if(!data){

  console.log("NO CREATOR FOUND");

  return;

}



    if(data){


      const account = {

        platform:data.platform,

        username:data.username,

        discord:data.discord_username,

        status:data.verification_code 
          ? "Verified"
          : "Pending",

        verificationCode:data.verification_code

      };


      setCreator(data);


      saveData(
        "linkedAccount",
        account
      );


    }


  }





  useEffect(()=>{

  const saved = getData("linkedAccount");


  if(saved){

    setDiscord(saved.discord);
    setUsername(saved.username);
    setPlatform(saved.platform);

    checkAccount();

  }

},[]);






  async function submitAccount(){


    if(
      !username ||
      !discord ||
      !paypalEmail
    ){

      alert("Please complete all fields.");

      return;

    }



    setLoading(true);



    const {error}=await supabase
      .from("creators")
      .insert({

        discord_username:discord,

        platform,

        username,

        paypal_email:paypalEmail,

        status:"Pending"

      });



    if(error){

      alert(error.message);

      setLoading(false);

      return;

    }



    setSubmitted(true);

    setLoading(false);


    checkAccount();


  }






  return (

    <main className="min-h-screen bg-black text-white p-10">


      <div className="max-w-xl mx-auto">


        <h1 className="text-4xl font-bold">
          Account Linking
        </h1>


        <p className="mt-4 text-gray-400">
          Link your social media account before submitting clips.
        </p>





        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">



<label>
Social Platform
</label>

<select
value={platform}
onChange={(e)=>setPlatform(e.target.value)}
className="mt-2 w-full bg-black border border-white/10 p-3 rounded-xl"
>

<option>TikTok</option>
<option>Instagram</option>
<option>YouTube</option>

</select>




<label className="block mt-6">
Username
</label>

<input
value={username}
onChange={(e)=>setUsername(e.target.value)}
className="mt-2 w-full bg-black border border-white/10 p-3 rounded-xl"
/>




<label className="block mt-6">
Discord Username
</label>

<input
value={discord}
onChange={(e)=>setDiscord(e.target.value)}
className="mt-2 w-full bg-black border border-white/10 p-3 rounded-xl"
/>




<label className="block mt-6">
PayPal Email
</label>

<input
value={paypalEmail}
onChange={(e)=>setPaypalEmail(e.target.value)}
className="mt-2 w-full bg-black border border-white/10 p-3 rounded-xl"
/>





<button

onClick={submitAccount}

disabled={loading}

className="mt-8 w-full bg-white text-black rounded-xl py-3"

>

{loading ? "Submitting..." : "Submit For Verification"}

</button>






{creator && (

<div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-xl p-4">

<p className="font-bold text-green-400">
🟢 Account Verified
</p>

<p className="mt-3">
Your verification code:
</p>

<p className="text-3xl font-bold mt-2">
{creator.verification_code || "No code assigned yet"}
</p>

<button
  onClick={() => {
    saveData(
      "linkedAccount",
      {
        platform: creator.platform,
        username: creator.username,
        discord: creator.discord_username,
        status: "Verified",
        verificationCode: creator.verification_code
      }
    );

    window.location.href = "/";
  }}
  className="mt-6 w-full rounded-xl bg-red-500 py-4 text-white font-bold"
>
  UNLOCK MY SUBMISSIONS & SUBMIT CLIP
</button>


</div>

)}


</div>

</div>

</main>

  );

}