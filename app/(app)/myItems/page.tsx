import Banner from "@/components/ui/banner";
import DashProfile from "@/components/ui/dashProfile";
import DashScroll from "@/components/ui/DashScroll";
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function MyItems() {
  const session = await getServerSession(authOptions)
  const email = JSON.stringify(session?.user?.email)

  

  return (
    <div className="bg-gray-200 min-h-screen">
      <Banner />
      <div className="flex mt-24">
        <div>
                <DashProfile />
        </div>
        <div className="w-[90%] px-50px mt-4">
          <DashScroll personal={true} email={email}/>
        </div>
      </div>
    </div>
  );
}