import {createLazyFileRoute} from '@tanstack/react-router';
import {__} from '@wordpress/i18n';
import InputText from '../../components/Inputs/InputText';
import Button from '../../components/Inputs/Button';

export const Route = createLazyFileRoute('/onboarding/style-widget')({
  component: () => {

    return (
        <>
          <div
              className="col-span-5 col-start-2 py-12 text-center flex flex-col">


            <h2 className={'text-base mt-2 mb-8'}>{__(
                '100% free. No credit card needed.')}</h2>
            <h1 className={'text-2xl font-bold mt-6'}>{__(
                "What's your Style?", 'simplybook')}</h1>

            <InputText
                placeholder={__('Email address', 'simplybook')}
            />
            <Button onClick={() => {}} link={{
              to: '/onboarding/implementation',
            }}>
              {__('Next Step: Finish', 'simplybook')}
            </Button>
          </div>
          <div className="col-span-5 col-start-7 py-12">
            <iframe width="100%" className={"aspect-video"} src="https://www.youtube-nocookie.com/embed/adYNTa9Gicw?si=A1cJfYkkfvlE9Yn0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </>
    );
  },
});