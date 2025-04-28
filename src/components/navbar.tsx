import {
  SquareChartGantt
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "../assets/img/logo.svg";
import MaxWidthWrapper from "./max-width-wrapper";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed z-40 w-full transition-all duration-300 ${isScrolled ? "bg-[#0B294B]" : "bg-[#0B294B]"
        }`}
    >
      <MaxWidthWrapper className="flex h-16 items-center justify-between">
        <Link to="/" className="z-30 flex font-semibold">
          <img src={Image} alt="Logo" className="w-44 rounded-sm" />
        </Link>

        <div className="hidden h-full items-center gap-4 lg:flex lg:gap-8">
          {[{ id: "", label: "Home" }, { id: "task-list", label: "Task List" }, { id: "levels", label: "Levels" }, { id: "profite", label: "Profite" }, { id: "profile", label: "My" }].map((item) => (
            <Link
              key={item.id}
              to={`/${item.id}`}
              className={`cursor-pointer rounded-md p-2 font-semibold backdrop-blur-lg transition-colors hover:bg-blue-500/20 text-gray-100 lg:text-lg`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <SquareChartGantt className="size-6 cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-5">
              <nav className="flex flex-col gap-4 text-lg font-medium">
                {[{ id: "hero", label: "Home" }, { id: "features", label: "Features" }, { id: "mathology-work", label: "How It Works" }, { id: "testimonials", label: "Testimonials" }, { id: "faq", label: "FAQ's" }].map((item) => (
                  <Link
                    key={item.id}
                    to={`/#${item.id}`}
                    className={`cursor-pointer transition-colors hover:text-blue-600`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="https://student.mathology.io"
                  className="rounded-bl-full rounded-br-full rounded-tl-full rounded-tr-lg bg-[#2431DD] p-4 capitalize text-white"
                >
                  Get Started
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
