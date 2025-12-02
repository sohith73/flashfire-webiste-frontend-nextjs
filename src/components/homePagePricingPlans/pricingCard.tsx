"use client";

import { useState, useMemo } from "react";
import { FaBolt } from "react-icons/fa";
import { trackButtonClick } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";

interface PricingPlan {
  title: string;
  tag?: string;
  subTitle: string;
  description: string;
  price: string;
  oldPrice?: string;
  features: string[];
  addOn?: boolean;
  highlight?: boolean;
  paymentLink?: string;
}

interface PricingCardProps {
  title: string;
  tag?: string;
  subTitle: string;
  description: string;
  price: string;
  oldPrice?: string;
  features: string[];
  addOn?: boolean;
  highlight?: boolean;
  paymentLink?: string;
  allPlans?: PricingPlan[];
}

interface BoosterOption {
  applications: number;
  price: number;
  label: string;
  paymentUrl: string;
}

// Upgrade prices configuration
interface UpgradePrice {
  from: string;
  to: string;
  price: number;
  paymentUrl?: string;
}

const upgradePrices: UpgradePrice[] = [
  { from: "IGNITE", to: "PROFESSIONAL", price: 170, paymentUrl: "https://www.paypal.com/ncp/payment/7Z7GT5CF75L3A" },
  { from: "IGNITE", to: "EXECUTIVE", price: 420, paymentUrl: "https://www.paypal.com/ncp/payment/AHW9DGNYWABZ4" },
  { from: "PROFESSIONAL", to: "EXECUTIVE", price: 285, paymentUrl: "https://www.paypal.com/ncp/payment/VR5YKZW26JUEL" },
];

// Booster options with payment URLs for different plans and countries
const planBoosterOptions: Record<string, Record<string, BoosterOption[]>> = {
  US: {
    IGNITE: [
      { 
        applications: 250, 
        price: 130, 
        label: "+250 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/ZTFDFLX4LDXRN"
      },
      { 
        applications: 500, 
        price: 220, 
        label: "+500 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/N9UN59NZ4TCZ6"
      },
      { 
        applications: 1000, 
        price: 380, 
        label: "+1000 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/5RLLXWWV7KBL2"
      },
    ],
    PROFESSIONAL: [
      { 
        applications: 250, 
        price: 120, 
        label: "+250 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/95X9FAUHTUPM4"
      },
      { 
        applications: 500, 
        price: 200, 
        label: "+500 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/58R6C59U8LBMS"
      },
      { 
        applications: 1000, 
        price: 350, 
        label: "+1000 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/QCQ5JTXK9ZY5L"
      },
    ],
    EXECUTIVE: [
      { 
        applications: 250, 
        price: 110, 
        label: "+250 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/R3UJGRAV9363A"
      },
      { 
        applications: 500, 
        price: 190, 
        label: "+500 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/JNJ7Y36YDSGYW"
      },
      { 
        applications: 1000, 
        price: 330, 
        label: "+1000 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/2RZEKDPESWA5A"
      },
    ],
  },
  CA: {
    IGNITE: [
      { 
        applications: 250, 
        price: 180, 
        label: "+250 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/VTDKG7AXSJ75Y"
      },
      { 
        applications: 500, 
        price: 305, 
        label: "+500 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/EX2YV4CN2WV3L"
      },
      { 
        applications: 1000, 
        price: 530, 
        label: "+1000 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/X4AC3EKGLV4WN"
      },
    ],
    PROFESSIONAL: [
      { 
        applications: 250, 
        price: 170, 
        label: "+250 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/GMKAWCJ8TBV4J"
      },
      { 
        applications: 500, 
        price: 280, 
        label: "+500 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/MMNRPXCKKLFX8"
      },
      { 
        applications: 1000, 
        price: 490, 
        label: "+1000 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/AA2DZ2ZBUEQSQ"
      },
    ],
    EXECUTIVE: [
      { 
        applications: 250, 
        price: 155, 
        label: "+250 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/S43ZN9SE6ER6U"
      },
      { 
        applications: 500, 
        price: 265, 
        label: "+500 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/Y3Q97WGY7HCTW"
      },
      { 
        applications: 1000, 
        price: 460, 
        label: "+1000 Extra Applications",
        paymentUrl: "https://www.paypal.com/ncp/payment/NM9683EWP7GKG"
      },
    ],
  },
};

export default function PricingCard({
  title,
  tag,
  subTitle,
  description,
  price,
  oldPrice,
  features,
  addOn,
  highlight,
  paymentLink,
  allPlans = [],
}: PricingCardProps) {
  // Single selection: null means no booster selected, number is the selected booster index
  const [selectedBooster, setSelectedBooster] = useState<number | null>(null);
  const [selectedUpgrade, setSelectedUpgrade] = useState<string | null>(null);
  const [showUpgradeOptions, setShowUpgradeOptions] = useState(false);

  // Get upgrade options based on current plan with upgrade prices
  const upgradeOptions = useMemo(() => {
    if (!allPlans || allPlans.length === 0) return [];
    
    const planHierarchy = ["IGNITE", "PROFESSIONAL", "EXECUTIVE"];
    const currentPlanIndex = planHierarchy.indexOf(title);
    
    if (currentPlanIndex === -1 || currentPlanIndex === planHierarchy.length - 1) {
      // EXECUTIVE or unknown plan - no upgrades
      return [];
    }
    
    // Return all plans higher in hierarchy than current with upgrade prices
    return allPlans
      .filter(plan => {
        const planIndex = planHierarchy.indexOf(plan.title);
        return planIndex > currentPlanIndex;
      })
      .map(plan => {
        // Find upgrade price for this upgrade path
        const upgradePriceConfig = upgradePrices.find(
          up => up.from === title && up.to === plan.title
        );
        const upgradePrice = upgradePriceConfig?.price || 0;
        const upgradePaymentUrl = upgradePriceConfig?.paymentUrl;
        
        return {
          ...plan,
          upgradePrice: upgradePrice, // Add upgrade price to the plan object
          upgradePaymentUrl: upgradePaymentUrl, // Add upgrade payment URL
        };
      });
  }, [title, allPlans]);

  // Parse base price from string (handles "$199" or "CA$279")
  const basePrice = useMemo(() => {
    const priceMatch = price.match(/[\d.]+/);
    return priceMatch ? parseFloat(priceMatch[0]) : 0;
  }, [price]);

  // Get currency symbol and country
  const currencySymbol = useMemo(() => {
    if (price.includes("CA$")) return "CA$";
    if (price.includes("$")) return "$";
    return "$";
  }, [price]);

  const country = useMemo(() => {
    return price.includes("CA$") ? "CA" : "US";
  }, [price]);

  // Get booster options for this plan and country
  const boosterOptions = useMemo(() => {
    return planBoosterOptions[country]?.[title] || [];
  }, [country, title]);

  // Calculate displayed price: if upgrade selected, show only upgrade price; if booster selected, show booster price; otherwise show base price
  const displayedPrice = useMemo(() => {
    // Priority: Upgrade > Booster > Base
    if (selectedUpgrade) {
      const upgradePlan = upgradeOptions.find(plan => plan.title === selectedUpgrade);
      if (upgradePlan && (upgradePlan as any).upgradePrice) {
        // Show only the upgrade price, not base + upgrade
        return (upgradePlan as any).upgradePrice;
      }
    }
    
    if (selectedBooster !== null && boosterOptions[selectedBooster]) {
      return boosterOptions[selectedBooster].price;
    }
    return basePrice;
  }, [basePrice, selectedBooster, selectedUpgrade, boosterOptions, upgradeOptions]);

  // Format price with currency
  const formattedPrice = useMemo(() => {
    return `${currencySymbol}${displayedPrice.toFixed(0)}`;
  }, [displayedPrice, currencySymbol]);

  // Get payment URL: if upgrade selected, use upgrade URL; if booster selected, use booster URL; otherwise use original paymentLink
  const currentPaymentLink = useMemo(() => {
    // Priority: Upgrade > Booster > Original
    if (selectedUpgrade) {
      const upgradePlan = upgradeOptions.find(plan => plan.title === selectedUpgrade);
      // First check for upgrade-specific payment URL, then fall back to plan's paymentLink
      if (upgradePlan && (upgradePlan as any).upgradePaymentUrl) {
        return (upgradePlan as any).upgradePaymentUrl;
      }
      if (upgradePlan?.paymentLink) {
        return upgradePlan.paymentLink;
      }
    }
    
    if (selectedBooster !== null && boosterOptions[selectedBooster]) {
      const boosterUrl = boosterOptions[selectedBooster].paymentUrl;
      // If booster URL is empty (e.g., Canada plans waiting for URLs), fall back to original paymentLink
      return boosterUrl || paymentLink;
    }
    return paymentLink;
  }, [selectedUpgrade, selectedBooster, paymentLink, boosterOptions, upgradeOptions]);

  const handleBoosterToggle = (index: number) => {
    // If clicking the same booster, deselect it; otherwise select the new one
    setSelectedBooster((prev) => {
      if (prev === index) {
        return null;
      } else {
        setSelectedUpgrade(null); // Clear upgrade when selecting booster
        return index;
      }
    });
  };
  
  return (
    <div className="flex flex-col max-w-[25rem] min-w-[22rem] max-[1024px]:min-w-[20rem] max-[768px]:max-w-[90%] max-[768px]:min-w-0 max-[768px]:w-full h-full">
    <div
      className={`bg-white border rounded-[0.3rem] p-8 flex-1 flex flex-col text-left relative transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] max-[768px]:p-6 ${highlight ? "border-2 border-[#ff4c00]" : "border border-black"}`}
    >
      {tag && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[0.9rem] font-semibold rounded px-3 py-1 ${
            tag === "MOST POPULAR" ? "bg-[#ff4c00]" : "bg-[#111]"
          }`}
        >
          {tag}
        </div>
      )}

      <h4 className="text-[#ff4c00] text-[1.5rem] font-bold mb-1 max-[768px]:text-[1.3rem] max-[480px]:text-[1.2rem]">
        {title}
      </h4>
      <h2 className="text-[2.2rem] font-extrabold text-[#111] max-[768px]:text-[1.9rem] max-[480px]:text-[1.7rem]">
        {subTitle}
      </h2>
      <p className="text-[#555] text-base mb-6 max-[768px]:text-[0.9rem]">
        {description}
      </p>

      <hr className="-mt-1 mb-3 text-black" />

      <ul className="list-none p-0 mb-6 min-h-[12rem] max-[480px]:min-h-0">
        {features.map((feature, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-base text-black mb-2 max-[768px]:text-[0.9rem] max-[480px]:text-[0.85rem]"
          >
            <FaBolt className="text-[#ff4c00] text-base" /> {feature}
          </li>
        ))}
      </ul>

      {addOn && (
        <div className="bg-[#f8f7f6] border border-[#f3dfd5] rounded-[0.4rem] p-4 mb-6">
          <h5 className="text-[1.3rem] font-bold mb-1 text-black max-[768px]:text-[1.1rem]">
            Booster Add-On
          </h5>
          <p className="text-[0.85rem] text-black mb-2">
            Add more application to boost your reach & visibility.
          </p>
          <ul className="list-none p-0 m-0 text-[0.85rem] text-[#333] space-y-2">
            {boosterOptions.length > 0 && boosterOptions.map((option, index) => (
              <li key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`booster-${title}-${index}`}
                  checked={selectedBooster === index}
                  onChange={() => handleBoosterToggle(index)}
                  className="w-4 h-4 cursor-pointer accent-[#ff4c00]"
                />
                <label
                  htmlFor={`booster-${title}-${index}`}
                  className="cursor-pointer flex-1"
                >
                  {option.label} — {currencySymbol}{option.price}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {upgradeOptions.length > 0 ? (
        <button
          onClick={() => {
            if (showUpgradeOptions) {
              // When hiding, clear the selected upgrade to reset to default price
              setSelectedUpgrade(null);
            }
            setShowUpgradeOptions(!showUpgradeOptions);
          }}
          className="bg-[#ff4c00] text-white border-none py-2 px-4 font-semibold text-sm rounded-[0.5rem] w-full cursor-pointer transition-all duration-300 hover:bg-[#e24300] mb-4"
        >
          {showUpgradeOptions ? "Hide Upgrade Options" : "Upgrade Plan"}
        </button>
      ) : (
        <div className="mb-4 h-[2.5rem]"></div>
      )}

      <div className="flex items-baseline gap-2.5 mb-1">
        <h3 className="text-[1.8rem] font-bold text-black max-[768px]:text-[1.6rem]">
          {formattedPrice}
        </h3>
        {oldPrice && (
          <span className="text-base text-[#999] line-through max-[768px]:text-sm">
            {oldPrice}
          </span>
        )}
      </div>

      <p className="text-[0.8rem] text-[#555] mb-5">
        Prices shown already include a {currencySymbol}20 discount.
      </p>

       {/* <p className="text-[0.85rem] text-[#555] mb-5">
        Total {subTitle.toLowerCase()} included
      </p> */}

      <button
        className="bg-black text-white border-none py-[0.9rem] px-4 font-semibold text-[0.95rem] rounded-[0.4rem] w-full cursor-pointer transition-all duration-300 hover:bg-[#111] max-[768px]:text-[0.9rem] max-[768px]:py-3 max-[480px]:text-[0.85rem] max-[480px]:py-[0.7rem] max-[480px]:px-[0.9rem]"
        onClick={() => {
          const utmSource = typeof window !== "undefined"
            ? localStorage.getItem("utm_source") || "WEBSITE"
            : "WEBSITE";
          const utmMedium = typeof window !== "undefined"
            ? localStorage.getItem("utm_medium") || "Pricing_Section"
            : "Pricing_Section";
          
          const finalPlanName = selectedUpgrade || title;
          const finalPrice = formattedPrice; // Already includes base + upgrade price if upgrade selected
          const finalSubtitle = selectedUpgrade
            ? upgradeOptions.find(p => p.title === selectedUpgrade)?.subTitle || subTitle
            : subTitle;
          
          if (typeof window !== "undefined") {
            GTagUTM({
              eventName: "pricing_cta_click",
              label: `Pricing_${finalPlanName}_Button${selectedUpgrade ? "_Upgrade" : ""}`,
              utmParams: {
                utm_source: utmSource,
                utm_medium: utmMedium,
                utm_campaign: localStorage.getItem("utm_campaign") || "Website",
              },
            });
          }
          
          // PostHog tracking
          trackButtonClick(`Start Now - ${finalPlanName}`, "pricing_cta", "cta", {
            button_location: "pricing_plan",
            plan_name: finalPlanName,
            original_plan: title,
            upgraded_from: selectedUpgrade ? title : null,
            upgraded_to: selectedUpgrade || null,
            plan_price: finalPrice,
            plan_subtitle: finalSubtitle,
            selected_booster: selectedBooster !== null && boosterOptions[selectedBooster] ? boosterOptions[selectedBooster].applications : null,
            total_price: finalPrice
          });
          
          if (currentPaymentLink) {
            window.open(currentPaymentLink, "_blank");
          }
        }}
      >
       {selectedUpgrade ? `Upgrade to ${selectedUpgrade} →` : "Start Now"}
      </button>
    </div>

    {/* Upgrade Options Display - Outside Card */}
    {showUpgradeOptions && upgradeOptions.length > 0 && (
      <div className="bg-[#fff4e6] border-2 border-[#ff4c00] rounded-[0.4rem] p-4 mt-4">
        <h5 className="text-[1.3rem] font-bold mb-1 text-black max-[768px]:text-[1.1rem]">
          Upgrade Plan
        </h5>
        <p className="text-[0.85rem] text-black mb-3">
          Upgrade to a higher tier for more applications and features.
        </p>
        <div className="space-y-2">
          {upgradeOptions.map((upgradePlan) => (
            <button
              key={upgradePlan.title}
              onClick={() => {
                setSelectedUpgrade(prev => prev === upgradePlan.title ? null : upgradePlan.title);
                setSelectedBooster(null); // Clear booster selection when upgrading
              }}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedUpgrade === upgradePlan.title
                  ? "border-[#ff4c00] bg-[#ff4c00] text-white"
                  : "border-[#ff4c00] bg-white text-black hover:bg-[#fff4e6]"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-sm">{upgradePlan.title}</div>
                  <div className="text-xs opacity-90">{upgradePlan.subTitle}</div>
                </div>
                <div className="font-bold text-sm">
                  {currencySymbol}{(upgradePlan as any).upgradePrice || 0}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    )}
    </div>
  );
}
