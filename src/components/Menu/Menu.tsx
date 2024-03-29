import { Link, Route } from "wouter";
import TopNavBar from "./TopNavBar/TopNavBar";
import Budget from "../../routes/budget";
import Reports from "../../routes/reports";
import Accounts from "../../routes/accounts";
import Profile from "../../routes/profile";
import AccountOverview from "../Account/AccountOverview";

export default function Menu() {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col mt-16 pt-2.5 h-auto">
        <TopNavBar />
        <div className="lg:pb-8"></div>
        <Route path="/budget/:year/:month" component={Budget} />
        <Route path="/reports" component={Reports} />
        <Route path="/accounts" component={Accounts} />
        <Route path="/accounts/:accountId" component={AccountOverview} />
        <Route path="/profile" component={Profile} />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-40 bg-base-100">
          <li>
            <Link href="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/reports">
              Reports
            </Link>
          </li>
          <div className="divider"><Link href="/accounts/all">Accounts</Link></div>
          <li>
            <Link href="/accounts/1">Account 1</Link>
          </li>
          <li>
            <Link href="/accounts/2">Account 2</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
