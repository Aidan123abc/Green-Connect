import Banner from "@/components/ui/banner";
import Sidebar from "@/components/ui/sidebar";
import DashProfile from "@/components/ui/dashProfile";
import DashScroll from "@/components/ui/DashScroll";

export default async function Dashboard() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Banner />
      <div className="w-90% mx-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-24">
          <div className="w-full lg:1/3 lg:max-w-[300px] justify-self-end sm:mr-4">
            <Sidebar />
          </div>
          <div className="w-full lg:2/3 lg:max-w-[700px] mt-8 sm:mt-4">
            <DashScroll personal={false} email={""} />
          </div>
          <div className="hidden lg:block lg:1/3 lg:max-w-[350px] justify-self-start ml-4">
            <DashProfile />
          </div>
        </div>
      </div>
    </div>
  );
}
