import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-black/50 backdrop-blur-xl">
      <MaxWidthWrapper>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">YourCompany</h3>
              <p className="text-sm text-gray-400">
                Building digital solutions for tomorrow&apos;s challenges.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">
                Services
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/services/web-development"
                    className="hover:text-white"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/mobile-apps"
                    className="hover:text-white"
                  >
                    Mobile Apps
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/cloud-solutions"
                    className="hover:text-white"
                  >
                    Cloud Solutions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-white">
                    Portfolio
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>contact@shareflyt.xyz</li>
                <li>Amsterdam, NL</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Shareflyt. All rights reserved.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
