import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import faq from '../../../assets/others/faq.jpg';

const Faq = () => {
    return (
        <div className=" flex items-center gap-8 mx-24 ">
            <div className=''>
                <img src={faq} width={1020} alt="" />
            </div>
        <div className="mx-auto w-full  rounded-2xl bg-white p-2">
             <h1 className='text-xl font-semibold bg-slate-200 w-7/12 text-center p-2 mb-8 rounded-lg'>Frequently asked questions</h1>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span>What is your refund policy?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  If you are unhappy with your purchase for any reason, email us
                  within 90 days and we will refund you in full, no questions asked.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex mt-2 w-full justify-between rounded-lg bg-emerald-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span>What is your refund policy?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  If you are unhappy with your purchase for any reason, email us
                  within 90 days and we will refund you in full, no questions asked.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span>Do you offer technical support?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  No.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
            
        </div>
    );
};

export default Faq;