const AppLoading = () => {
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto flex max-w-screen-2xl items-center px-5">
          <div>
            <img
              src={`${simplybook.assetsUrl}/img/logo.svg`}
              alt="SimplyBook"
              className="h-12 w-40 px-5 py-2"
            />
          </div>
          <div className="flex animate-pulse items-center blur-sm">
            <div className="border-transparen t border-b-4 px-5 py-6">
              Dashboard
            </div>
            <div className="ml-2 border-b-4 border-transparent px-5 py-6">
              Clients 0
            </div>
            <div className="ml-2 border-b-4 border-transparent px-5 py-6">
              Calendar 0
            </div>
            <div className="ml-2 border-b-4 border-transparent px-5 py-6">
              Settings
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-2xl">
        <div className="m-5 grid min-h-full w-full grid-cols-12 gap-5">
          <div className="col-span-6 row-span-2 rounded-xl bg-white p-5 shadow-md">
            <div className="mb-5 h-6 w-1/2 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-4/5 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-full animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-5/6 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-4/5 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-5/6 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-full animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-5/6 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
          </div>
          <div className="col-span-3 row-span-2 rounded-xl bg-white p-5 shadow-md">
            <div className="mb-5 h-6 w-1/2 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-4/5 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-full animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-5/6 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-4/5 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-5/6 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-full animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-5/6 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
          </div>
          <div className="col-span-3 row-span-2 rounded-xl bg-white p-5 shadow-md">
            <div className="mb-5 h-6 w-1/2 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-4/5 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-full animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-5/6 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-4/5 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-5/6 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-full animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
            <div className="mb-5 h-6 w-5/6 animate-pulse rounded-md bg-gray-200 px-5 py-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLoading;