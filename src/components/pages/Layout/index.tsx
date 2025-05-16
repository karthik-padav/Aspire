import logo from "@/assets/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import { constants } from "@/components/lib/constants";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <div className="flex min-h-screen">
      <div className="max-w-[340px] p-12 bg-navyBlue hidden md:block">
        <img src={logo} alt="aspire" />
        <p className="text-base text-white opacity-30 mt-5">
          Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </p>
        <div className="mt-20">
          {constants.menu.map((i, index) => (
            <Link
              to={i.url}
              key={index}
              className={`${
                i.url === location.pathname ? "text-green" : "text-white"
              } flex items-center gap-4 mb-14 cursor-pointer`}
            >
              <img src={i.icon} className="" alt={i.title} />
              <p className="text-base">{i.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="grid grid-cols-5 bg-white border border-white1 drop-shadow-sm p-2">
          {constants.menu.map((i, index) => (
            <Link
              to={i.url}
              key={index}
              className={`${
                i.url === location.pathname ? "text-green" : "text-black"
              } flex flex-col items-center justify-between gap-1 cursor-pointer`}
            >
              <img src={i.m_icon} className="" alt={i.title} />
              <p className="text-xs">{i.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="p-0 md:p-14 w-full">{children}</div>
    </div>
  );
}
