import { ReactElement } from "react";
import Nav from "../components/topnav";

export default function UserLayout({ children }: { children: ReactElement }) {
  return (
    <div>
      <Nav />
      <main>{children}</main>
    </div>
  );
}
