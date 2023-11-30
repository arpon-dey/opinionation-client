import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import faq from '../../../assets/others/faq.jpg';

const Faq = () => {
  return (
    <div className=" flex flex-col md:flex-row items-center gap-8 md:mx-24 ">
      <div className=''>
        <img src={faq} width={1020} alt="" />
      </div>
      <div className="mx-auto w-full  rounded-2xl bg-white p-2">
        <h1 className='md:text-xl font-semibold bg-slate-200 md:w-7/12 text-center p-2 mb-8 rounded-lg'>Frequently asked questions</h1>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>Can I create my own survey?</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
              Absolutely! If you want to create a survey, you can do so by visiting the "Create Survey" section. Here, you can customize your survey with various question types, categories, and more.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex mt-2 w-full justify-between rounded-lg bg-emerald-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>What are the benefits of becoming a Pro Member?</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
              Pro Members enjoy exclusive benefits, including advanced analytics, early access to surveys, and an ad-free interface. By upgrading to Pro, you support the growth of our community and enhance your overall experience on the platform.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>How do I contact OpinioNation support?</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
              If you have any questions, concerns, or technical issues, you can reach out to our support team through the "Contact Us" page. We're here to assist you.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

    </div>
  );
};

export default Faq;