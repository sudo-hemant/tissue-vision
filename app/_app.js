"use client";

import PollingProvider from "@/contexts/PollingProvider";

const MyApp = ({ children }) => {
  return (
    <div className="">
      <nav className="flex justify-between w-full px-12 py-4 h-16 bg-gray-300 text-gray-900 text-xl font-semibold">
        <div>Project Drive</div>

        <ul className="flex gap-8 justify-end ">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-100">
        <PollingProvider>{children}</PollingProvider>
      </div>
      ;
    </div>
  );
};

export default MyApp;
