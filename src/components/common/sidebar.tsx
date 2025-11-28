import { Link } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";

export const Sidebar = () => {
  return (
    <>
      <div className="flex flex-col gap-4 size-full bg-primary">
        <nav>
          <ul>
            <li>
              <Link to="/">
                <HomeIcon />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
