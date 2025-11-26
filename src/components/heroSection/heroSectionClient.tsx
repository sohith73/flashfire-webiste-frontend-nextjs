"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { HeroSectionData } from "@/src/types/heroSectionData";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { getCurrentUTMParams } from "@/src/utils/UTMUtils";
import FlashfireLogo from "@/src/components/FlashfireLogo";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

type Props = {
  data: HeroSectionData;
};

export default function HeroSectionClient({ data }: Props) {
  const router = useRouter();
  const { isHolding, holdProgress, getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  return (
    <section className="bg-[#f9e8e0] text-center p-8 pb-16 font-['Space_Grotesk',sans-serif] overflow-x-hidden w-full max-w-full box-border max-[768px]:p-6 max-[768px]:px-4 max-[768px]:pb-12 max-[480px]:p-4 max-[480px]:px-3 max-[480px]:pb-8">
      {/* === Top Badges === */}
      <div className="flex justify-center gap-2.5 flex-wrap mb-8 mt-8 max-[768px]:flex-row">
        {data.badges.map((badge) => (
          <span key={badge} className="border-[0.5px] border-black text-[#F55D1D] font-['Space_Grotesk',sans-serif] text-xs font-bold leading-none tracking-[0.72px] text-center uppercase px-3 py-1.5 rounded-none inline-flex items-center justify-center h-[27px] w-48 whitespace-nowrap opacity-100 max-[768px]:flex max-[768px]:flex-row max-[768px]:text-[0.7rem] max-[768px]:px-2 max-[768px]:py-1">
            {badge}
          </span>
        ))}
      </div>

      {/* === Headline === */}
      <h1 className="text-[3.5rem] leading-[0.5] font-bold text-black max-w-[900px] w-full mx-auto mb-1 flex flex-col items-center justify-center text-center break-keep px-4 gap-0 max-[1200px]:text-[3rem] max-[1200px]:max-w-[800px] max-[968px]:text-[2.5rem] max-[968px]:max-w-[700px] max-[968px]:overflow-x-hidden max-[768px]:sticky max-[768px]:top-[120px] max-[768px]:z-40 max-[768px]:bg-[#f9e8e0] max-[768px]:text-2xl max-[768px]:font-bold max-[768px]:max-w-full max-[768px]:w-full max-[768px]:text-black max-[768px]:leading-[1.2] max-[768px]:px-2 max-[768px]:py-3 max-[768px]:mb-2 max-[768px]:overflow-x-hidden max-[480px]:text-[1.6rem] max-[480px]:leading-[1.3] max-[480px]:px-3 max-[480px]:top-[110px] max-[480px]:py-2">
        <span className="block whitespace-nowrap leading-[0.5] text-center w-full m-0 p-0 h-auto -mt-[0.1em] -mb-[0.1em] first:mb-0 max-[968px]:whitespace-normal max-[968px]:break-words max-[968px]:break-keep max-[768px]:whitespace-normal max-[768px]:block max-[768px]:leading-[1.2] max-[768px]:break-words max-[480px]:leading-[1.3]">{data.headlineMain}</span>
        <span className="block whitespace-nowrap leading-[0.5] text-center w-full m-0 p-0 h-auto -mt-[0.1em] -mb-[0.1em] first:mb-0 max-[968px]:whitespace-normal max-[968px]:break-words max-[968px]:break-keep max-[768px]:whitespace-normal max-[768px]:block max-[768px]:leading-[1.2] max-[768px]:break-words max-[480px]:leading-[1.3]">
          <span className="text-black whitespace-nowrap tracking-[-0.05em] inline-block max-[968px]:whitespace-normal max-[768px]:whitespace-normal max-[768px]:inline">{data.headlineHighlight}</span>
          <FlashfireLogo
            width={60}
            height={60}
            className="inline-block align-middle -mx-[0.4em] h-[2.3em] w-auto leading-none flex-shrink-0 object-contain max-[768px]:h-[2.8em] max-[768px]:w-auto max-[768px]:mx-[0.2em] max-[768px]:align-middle max-[768px]:flex-shrink-0 max-[480px]:h-[2.5em] max-[480px]:mx-[0.15em]"
          />
          <span className="text-black whitespace-nowrap tracking-[-0.05em] inline-block max-[968px]:whitespace-normal max-[768px]:whitespace-normal max-[768px]:inline">{data.headlineSuffix}</span>
        </span>
      </h1>

      {/* === Description === */}
      <p className="font-['Satoshi',sans-serif] text-xl font-medium leading-[144%] tracking-[-0.4px] text-center text-black max-w-[620px] mx-auto mb-8 max-[768px]:text-[0.95rem] max-[768px]:font-bold max-[768px]:text-black max-[480px]:text-[0.9rem] max-[480px]:px-2">{data.description}</p>

      {/* === CTA Button === */}
      <button
        {...getButtonProps()}
        onClick={() => {
          const utmSource = typeof window !== "undefined"
            ? localStorage.getItem("utm_source") || "WEBSITE"
            : "WEBSITE";
          const utmMedium = typeof window !== "undefined"
            ? localStorage.getItem("utm_medium") || "Website_Front_Page"
            : "Website_Front_Page";

          GTagUTM({
            eventName: "sign_up_click",
            label: "Hero_Start_Free_Trial_Button",
            utmParams: {
              utm_source: utmSource,
              utm_medium: utmMedium,
              utm_campaign: typeof window !== "undefined"
                ? localStorage.getItem("utm_campaign") || "Website"
                : "Website",
            },
          });

          // PostHog tracking
          trackButtonClick("Get me interview", "hero_cta", "cta", {
            button_location: "hero_main_cta",
            section: "hero_landing"
          });
          trackSignupIntent("hero_cta", {
            signup_source: "hero_main_button",
            funnel_stage: "signup_intent"
          });

          // Navigate to /get-me-interview with preserved UTM params
          const utmParams = getCurrentUTMParams();
          const targetPath = utmParams ? `/get-me-interview?${utmParams}` : '/get-me-interview';
          
          // Dispatch custom event to force show modal (even if already on the route)
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('showGetMeInterviewModal'));
          }
          
          router.push(targetPath);
        }}
        className="inline-block bg-black text-white py-3.5 px-7 rounded-lg font-semibold no-underline mb-6 shadow-[0_3px_0_#ff4c00] transition-all duration-300 border-none cursor-pointer text-base font-inherit hover:bg-[#222] hover:-translate-y-0.5 max-[768px]:py-3 max-[768px]:px-5"
      >
        {data.cta.label}
      </button>

      {/* === Trusted Users === */}
      <div className="flex items-center justify-center gap-2.5 mb-12">
        <div className="flex items-center">
          {["amit.jpg", "aman.jpg", "akrati.jpeg"].map((img, i) => (
            <div key={i} className={`relative w-[2.2rem] h-[2.2rem] rounded-full border-2 border-white overflow-hidden -ml-3.5 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] ${i === 0 ? 'ml-0' : ''}`}>
              <Image
                src={`/images/${img}`}
                alt={`User ${i + 1}`}
                fill
                sizes="2.2rem"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <p className="text-base text-black font-medium">{data.trustText}</p>
      </div>

      {/* === Universities Section === */}
      <div className="w-[70%] mx-auto mb-8 flex flex-col gap-[0.05rem] items-center justify-center max-[768px]:w-full max-[768px]:p-2 max-[768px]:mb-4">
        {/* Heading in separate box */}
        <div className="bg-white rounded-none py-4 px-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] w-[90%] max-w-[90%] mx-auto mb-0">
          <p className="text-[0.9rem] font-normal uppercase text-[#555] tracking-[0.05em] m-0">{data.universityHeading}</p>
        </div>

        {/* University logos below */}
        <div className="flex justify-start items-center overflow-x-auto overflow-y-hidden relative p-0 rounded-none w-[90%] max-w-[90%] mx-auto mt-0 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-[768px]:max-w-[95%]">
          <div className="flex items-center justify-start gap-[0.05rem] flex-nowrap w-max pl-0 pr-0">
            {data.universities.map((uni, index) => (
              <div key={index} className="flex-none bg-white border border-gray-200 rounded-md p-2.5 w-[200px] h-20 flex flex-row items-center justify-start gap-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out snap-start">
                <Image
                  src={`https://logo.clearbit.com/${uni.domain}`}
                  alt={uni.name}
                  width={60}
                  height={40}
                  className="object-contain w-auto max-w-[50px] h-8 max-h-8 flex-shrink-0 max-[768px]:h-8"
                />
                <p className="text-black text-[0.8rem] font-medium text-left leading-[1.3] m-0 p-0 whitespace-nowrap flex-1">{uni.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
