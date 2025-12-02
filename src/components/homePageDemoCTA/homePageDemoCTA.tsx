"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./homePageDemoCTA.module.css";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { getCurrentUTMParams } from "@/src/utils/UTMUtils";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function HomePageDemoCTA() {
  const router = useRouter();
  const { isHolding, holdProgress, getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  return (
    <section className={styles.demoSectionOuter}>
      <div className={styles.demoSection}>
        <h5 className={styles.demoSubheading}>
          GOT FURTHER QUESTIONS? LET&rsquo;S TALK!
        </h5>

        <h2 
          {...getButtonProps()}
          style={{
            cursor: 'pointer',
          }}
          className={styles.demoHeading}
          onClick={() => {
            const utmSource = typeof window !== "undefined" 
              ? localStorage.getItem("utm_source") || "WEBSITE"
              : "WEBSITE";
            const utmMedium = typeof window !== "undefined"
              ? localStorage.getItem("utm_medium") || "Demo_CTA_Section"
              : "Demo_CTA_Section";
            
            GTagUTM({
              eventName: "sign_up_click",
              label: "Demo_CTA_Heading_Button",
              utmParams: {
                utm_source: utmSource,
                utm_medium: utmMedium,
                utm_campaign: typeof window !== "undefined"
                  ? localStorage.getItem("utm_campaign") || "Website"
                  : "Website",
              },
            });
            
            trackButtonClick("BOOK A DEMO CALL", "demo_cta", "cta", {
              button_location: "demo_cta_heading",
              section: "demo_cta",
              target_url: "/book-my-demo-call"
            });
            trackSignupIntent("demo_cta", {
              signup_source: "demo_cta_heading",
              funnel_stage: "signup_intent",
              target_url: "/book-my-demo-call"
            });
            
            // Save current scroll position to sessionStorage before navigation
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('preserveScrollPosition', window.scrollY.toString());
            }
            
            // Navigate to /book-my-demo-call with preserved UTM params
            const utmParams = getCurrentUTMParams();
            const targetPath = utmParams ? `/book-my-demo-call?${utmParams}` : '/book-my-demo-call';
            
            // Dispatch custom event to force show modal (even if already on the route)
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('showGetMeInterviewModal'));
            }
            
            router.push(targetPath);
          }}
        >
          BOOK A DEMO{" "}
          <span
            className={styles.fireIcon}
          >
            <Image
              src="/images/character.png"
              alt="Flashfire mascot"
              width={96}
              height={96}
              className="w-20 h-20 max-[600px]:w-16 max-[600px]:h-16"
            />
          </span>{" "}
          CALL
        </h2>

        <p className={styles.demoText}>
          We get it, <em>finding the right job isn&apos;t easy.</em> Book a quick
          chat with our founder and see how Flashfire can help you land
          interviews faster.
        </p>

        <button 
          {...getButtonProps()}
          className={styles.demoButton}
          onClick={() => {
            const utmSource = typeof window !== "undefined" 
              ? localStorage.getItem("utm_source") || "WEBSITE"
              : "WEBSITE";
            const utmMedium = typeof window !== "undefined"
              ? localStorage.getItem("utm_medium") || "Demo_CTA_Section"
              : "Demo_CTA_Section";
            
            GTagUTM({
              eventName: "sign_up_click",
              label: "Demo_CTA_Button",
              utmParams: {
                utm_source: utmSource,
                utm_medium: utmMedium,
                utm_campaign: typeof window !== "undefined"
                  ? localStorage.getItem("utm_campaign") || "Website"
                  : "Website",
              },
            });
            
            trackButtonClick("Book My Demo Call", "demo_cta", "cta", {
              button_location: "demo_cta_button",
              section: "demo_cta",
              target_url: "/book-my-demo-call"
            });
            trackSignupIntent("demo_cta", {
              signup_source: "demo_cta_button",
              funnel_stage: "signup_intent",
              target_url: "/book-my-demo-call"
            });
            
            // Save current scroll position to sessionStorage before navigation
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('preserveScrollPosition', window.scrollY.toString());
            }
            
            // Navigate to /book-my-demo-call with preserved UTM params
            const utmParams = getCurrentUTMParams();
            const targetPath = utmParams ? `/book-my-demo-call?${utmParams}` : '/book-my-demo-call';
            
            // Dispatch custom event to force show modal (even if already on the route)
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('showGetMeInterviewModal'));
            }
            
            router.push(targetPath);
          }}
        >
          Book My Demo Call →
        </button>

        <p className={styles.demoNote}>
          Limited slots available. Book your call now!
        </p>
      </div>
    </section>
  );
}

