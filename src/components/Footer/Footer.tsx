import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white h-16">
      <div className="border-t border-gray-200" />

      <div className="h-full px-8 flex flex-col md:flex-row md:justify-between justify-center items-center ">
        <div className="text-center md:text-left pb-2 md:pb-0">
          <p className="text-sm text-muted-foreground">
            Tastify &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex space-x-8">
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-gray-600"
            >
              Terms
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-gray-600"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-gray-600"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
