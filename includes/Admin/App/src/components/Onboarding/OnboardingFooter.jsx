const OnboardingFooter = () => {
  const items = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className={"bg-blue-50 py-10"}>
      <div className="mx-auto max-w-screen-md items-center">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">
            What can you do with SimplyBook.me?
          </h2>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="text-center">
              <img
                src={item.image}
                alt="Placeholder"
                className="mx-auto mb-4 h-20 w-20"
              />
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFooter;
