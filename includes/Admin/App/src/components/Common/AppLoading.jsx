const AppLoading = () => {
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto flex max-w-screen-2xl items-center px-5">
        <div>
            <img src={`${simplybook.pluginUrl}/includes/Admin/App/assets/img/logo.svg`} alt="SimplyBook" className="h-12 w-40 px-5 py-2" />
          </div>
          <div className="flex items-center blur-sm animate-pulse">
            <div className="py-6 px-5 border-b-4 border-transparen t">Dashboard</div>
            <div className="py-6 px-5 border-b-4 border-transparent  ml-2">Clients 0</div>
            <div className="py-6 px-5 border-b-4 border-transparent ml-2">Calendar 0</div>
            <div className="py-6 px-5 border-b-4 border-transparent ml-2">Settings</div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-2xl">
        <div className="m-5 grid min-h-full w-full grid-cols-12 gap-5">
          <div className="col-span-6 row-span-2 bg-white shadow-md rounded-xl p-5">
            <div className="h-6 w-1/2 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-4/5 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-full px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-4/5 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-full px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
          </div>
          <div className="col-span-3 row-span-2 bg-white shadow-md rounded-xl p-5">
            <div className="h-6 w-1/2 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-4/5 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-full px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-4/5 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-full px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
          </div>
          <div className="col-span-3 row-span-2 bg-white shadow-md rounded-xl p-5">
            <div className="h-6 w-1/2 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-4/5 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-full px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-4/5 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-full px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div className="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLoading;