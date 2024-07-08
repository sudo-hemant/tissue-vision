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
      <nav className="flex justify-between w-full px-2 md:px-12 py-2 md:py-4 h-12 md:h-16 bg-gray-300 text-gray-900 text-base md:text-xl font-semibold">
        <div className="flex items-center gap-2">
          <CloudCircleRoundedIcon color="primary" fontSize="large" />
          <div>Project Drive</div>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center p-2 md:p-8 h-full w-full">
        <PollingProvider>
          <DownloadProgressBar />

          {children}
        </PollingProvider>
      </div>
    </div>
  );
};

export default MyApp;
