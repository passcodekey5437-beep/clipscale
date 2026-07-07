import { campaigns } from "@/data/campaigns";

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const campaign = campaigns.find(
    (campaign) => campaign.id === id
  );


  if (!campaign) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        Campaign not found
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold">
          {campaign.name}
        </h1>


        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">


          <p className="text-xl">
            💰 Reward:
            <span className="ml-2">
              {campaign.reward}
            </span>
          </p>


          <p className="mt-4 text-xl">
            👁 Minimum Views:
            <span className="ml-2">
              {campaign.minimumViews}
            </span>
          </p>


          <p className="mt-4 text-gray-300">
            Platforms:
            {" "}
            {campaign.platforms.join(", ")}
          </p>


          <button className="mt-8 rounded-xl bg-white px-6 py-3 text-black">
            Open Instructions
          </button>


        </div>

      </div>

    </main>
  );
}