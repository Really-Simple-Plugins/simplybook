import { createLazyFileRoute } from "@tanstack/react-router";
import Header from "../components/Common/Header.jsx";
import Progress from "../components/Dashboard/Progress";
import Bookings from "../components/Dashboard/Bookings";
import Management from "../components/Dashboard/Management";
import TipsTricks from "../components/Dashboard/TipsTricks";
import OurPlugins from "../components/Dashboard/OurPlugins";
import LiveAgent from "../components/Common/LiveAgent";

export const Route = createLazyFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-screen-2xl px-4">
        <div className="m-5 grid min-h-full w-full grid-cols-12 gap-5">
          <Progress />
          <Bookings />
          <Management />
          <TipsTricks />
          <OurPlugins />
          <LiveAgent style={"col-span-12 !bg-transparent shadow-none"}/>
        </div>
      </div>
    </>
  );
}