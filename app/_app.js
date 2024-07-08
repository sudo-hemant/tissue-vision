"use client";

import CloudCircleRoundedIcon from "@mui/icons-material/CloudCircleRounded";

import DownloadProgressBar from "@/components/DownloadProgressBar";
import PollingProvider from "@/contexts/PollingProvider";
import { useRouter } from "next/navigation";

const MyApp = ({ children }) => {
  const router = useRouter();

  const handleHomeMenuClick = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between w-full px-12 py-4 h-16 bg-gray-300 text-gray-900 text-xl font-semibold">
        <div className="flex items-center gap-2">
          <CloudCircleRoundedIcon color="primary" fontSize="large" />
          <div>Project Drive</div>
        </div>

        <ul className="flex gap-16 justify-end ">
          <li>
            <a href="#" onClick={handleHomeMenuClick}>
              Home
            </a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="flex flex-col items-center justify-center p-8 h-full w-full">
        <PollingProvider>
          <DownloadProgressBar />

          {children}
        </PollingProvider>
      </div>
    </div>
  );
};

export default MyApp;
