import {createLazyFileRoute} from '@tanstack/react-router';
import {__} from '@wordpress/i18n';
import ButtonInput from '../../components/Inputs/ButtonInput';

export const Route = createLazyFileRoute('/onboarding/tips-and-tricks')({
  component: () => {

    return (
      <>
        <div
            className="col-span-4 col-start-3 row-span-2 my-12 flex flex-col text-black">
          <div className={"my-6 text-center"}>
            <h1 className={"text-3xl font-semibold text-black"}>
              {__("Tips & Tricks", "simplybook")}
            </h1>
            <h2 className={"mt-2 text-base font-light text-black"}>
              {__(
                  "Get weekly tips & tricks for your business and working with SimplyBook.me\n" +
                  "to book success.",
                  "simplybook",
              )}
            </h2>
          </div>
          <div className={"grid grid-cols-2 gap-4"}>
            <div className={"p-5"}>Review 1</div>
            <div className={"p-5"}>Review 2</div>
          </div>
          <div className={"flex flex-col"}>
            <ButtonInput
                onClick={() => {}}
                link={{
                  to: "/onboarding/information-check",
                }}
            >
              {__("Continue", "simplybook")}
            </ButtonInput>
            <p className="mt-4 text-center text-xs font-light text-gray-600">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut
            </p>
          </div>
        </div>
        <div className="col-span-4 col-start-7 py-12">
          <iframe
              width="100%"
              className={"aspect-video"}
              src="https://www.youtube-nocookie.com/embed/adYNTa9Gicw?si=A1cJfYkkfvlE9Yn0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
          ></iframe>
        </div>
      </>
    );
  },
});