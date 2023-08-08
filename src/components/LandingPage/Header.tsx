import SignupButton from '../Login/SignupButton';
import LoginButton from '../Login/LoginButton';
import { Link } from 'wouter';
import useIsMobile from '../../hooks/useIsMobile';

const Header = () => {
  const { isMobile } = useIsMobile();

  const links = <>
    <li className='list-none'>
      <Link to="/about" className="transition duration-300 hover:text-neutral">
        About Us
      </Link>
    </li>
    <li className='list-none'>
      <Link to="/philosophy" className="transition duration-300 hover:text-neutral">
        Philosophy
      </Link>
    </li>
    <li className='list-none'>
      <Link to="/get-started" className="transition duration-300 hover:text-neutral">
        Get Started
      </Link>
    </li>
  </>

  let linksNav;

  if (isMobile) {
    linksNav =
      <details className="dropdown">
        <summary className="m-1 btn">Learn More</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full">
          {links}
        </ul>
      </details>
  } else {
    linksNav = <nav className="ml-8 space-x-4 flex">
      {links}
    </nav>
  }

  return (
    <header className="fixed top-0 left-0 w-full shadow-md py-4 flex justify-between items-center bg-neutral px-4">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-white-800"><Link to='home'>Flatbudget</Link></h1>
        {linksNav}
      </div>
      <div className="flex space-x-4">
        <LoginButton />
        {!isMobile && <SignupButton />}
      </div>
    </header>
  );
};

export default Header;