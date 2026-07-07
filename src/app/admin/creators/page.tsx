"use client";

import { useEffect, useState } from "react";
import { getData, saveData } from "@/lib/storage";


export default function CreatorManagement() {


  const [creator, setCreator] = useState<any>(null);

  const [code, setCode] = useState("");



  useEffect(()=>{


    const savedAccount = getData("linkedAccount");


    if(savedAccount){

      setCreator(savedAccount);

    }


  },[]);




  function sendCode(){


    if(!creator) return;



    const updated = {

      ...creator,

      verificationCode: code,

      status: "Code Sent"

    };



    saveData(
      "linkedAccount",
      updated
    );


    setCreator(updated);


  }





  function verifyCreator(){


    if(!creator) return;



    const updated = {

      ...creator,

      status: "Verified"

    };



    saveData(
      "linkedAccount",
      updated
    );


    setCreator(updated);


  }





  return (

    <main className="min-h-screen bg-black text-white p-10">


      <div className="max-w-3xl mx-auto">


        <h1 className="text-4xl font-bold">
          Creator Verification
        </h1>



        {!creator ? (

          <div className="mt-8 rounded-xl bg-white/5 p-6">

            No creators waiting for verification.

          </div>


        ) : (


          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">


            <h2 className="text-2xl font-semibold">
              Creator Account
            </h2>



            <p className="mt-5">
              Platform:
              <span className="ml-2 text-gray-300">
                {creator.platform}
              </span>
            </p>



            <p className="mt-2">
              Account:
              <span className="ml-2 text-gray-300">
                {creator.username}
              </span>
            </p>



            <p className="mt-2">
              Discord:
              <span className="ml-2 text-gray-300">
                {creator.discord}
              </span>
            </p>



            <p className="mt-4">
              Status:
              <span className="ml-2">
                {creator.status}
              </span>
            </p>




            <input

              placeholder="Enter verification code"

              value={code}

              onChange={(e)=>setCode(e.target.value)}

              className="mt-6 w-full rounded-xl bg-black border border-white/10 p-3"

            />




            <button

              onClick={sendCode}

              className="mt-5 rounded-xl bg-white px-5 py-3 text-black"

            >

              Send Code

            </button>





            <button

              onClick={verifyCreator}

              className="mt-5 ml-4 rounded-xl bg-green-500 px-5 py-3 text-black"

            >

              Mark Verified

            </button>





            {creator.verificationCode && (

              <div className="mt-6 rounded-xl bg-black border border-white/10 p-4">


                Verification Code:

                <span className="ml-2 font-bold">

                  {creator.verificationCode}

                </span>


              </div>

            )}




          </div>


        )}



      </div>


    </main>

  );

}