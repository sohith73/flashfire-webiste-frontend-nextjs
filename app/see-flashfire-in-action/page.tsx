import HomePage from "@/src/components/pages/home/Home";
import ScrollToSection from "@/src/utils/ui/scrollToSection";

export default function SeeFlashfireInActionPage() {
  return (
    <>
      <HomePage />
      <ScrollToSection targetId="demo" />
    </>
  );
}

