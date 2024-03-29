import Logo from "../../../assets/images/logo.png";
import Image from "next/image";
import classes from "./Header.module.css";
import Button from "../../UI/Button";
import Link from "next/link";
import useWallet from "../../hooks/useWallet";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const { isConnected, setConnectionHandler, removeConnectionHandler } =
    useWallet();

  const connect = () => {
    if (isConnected) {
      removeConnectionHandler();
      return;
    }
    setConnectionHandler();
  };
  const [navOpen, setNavOpen] = useState(false);
  const [header, setHeader] = useState(false);
  const router = useRouter();
  const onNavigationClose = () => {
    setNavOpen(false);
  };

  //const openNavHandler = () => {
  //setNavOpen(!navOpen);
  //};

  const openNavHandler = () => {
    setNavOpen(!navOpen);
    if (navOpen) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }
  };

  const NavLink = ({ href, children }) => {
    const closeNav = () => {
      setNavOpen(false);
      document.body.classList.remove("no-scroll");
    };

    return (
      <Link href={href}>
        <a onClick={closeNav}>{children}</a>
      </Link>
    );
  };

  useEffect(() => {
    const onNavigationClose = (event) => {
      if (
        !event.target.closest(`.${classes.NavMobile}`) &&
        !event.target.closest(`.${classes.MenuButton}`)
      ) {
        setNavOpen(false);
      }
    };

    window.addEventListener("click", onNavigationClose);
    return () => {
      window.removeEventListener("click", onNavigationClose);
    };
  }, []);

  return (
    <header className={classes.Header}>
      <div className="container">
        <div className={classes.HeaderCol}>
          <div className={classes.LogoWrapper}>
            <Link href="/">
              <a>
                <Image src={Logo.src} alt="logo" width={58} height={40} />
              </a>
            </Link>
          </div>
          <nav>
            <ul>
              <span>
                Explore
                <svg
                  width="7"
                  height="4"
                  viewBox="0 0 7 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.86079 0.816411L3.83608 3.85993C3.65047 4.04669 3.34953 4.04669 3.16392 3.85993L0.139209 0.816411C-0.0464029 0.629645 -0.0464029 0.326839 0.139209 0.140074C0.32482 -0.0466913 0.625755 -0.0466913 0.811367 0.140074L3.5 2.84542L6.18863 0.140074C6.37424 -0.0466913 6.67518 -0.0466913 6.86079 0.140074C7.0464 0.326839 7.0464 0.629645 6.86079 0.816411Z"
                    fill="#F7F6F6"
                  />
                </svg>
              </span>
              {/* </Link> */}
              <Link href="/tokenomics">Tokenomics</Link>
              <Link href="/traits">Traits</Link>
              <Link href="/faq">FAQ</Link>
              {/* <Link href="/gallery">Gallery</Link>
              <Link href="/leaderboard">Leaderboard</Link> */}
            </ul>
          </nav>
        </div>
        <div className={classes.HeaderCol}>
          <Button onClick={connect} type="transparent">
            {!isConnected ? "Connect Wallet" : "Disconnect Wallet"}
          </Button>
          <div
            onClick={openNavHandler}
            className={`${classes.MenuButton} ${
              navOpen ? classes.HamburgerTransform : ""
            }`}
          >
            <div></div>
            <div></div>
          </div>
          <div
            className={`${classes.NavMobile} ${
              navOpen ? classes.NavOpen : classes.NavClose
            }`}
          >
            <div className={classes.NavLinksMobile}>
              <NavLink href="/tokenomics">Tokenomics</NavLink>
              <NavLink href="/traits">Traits</NavLink>
              <NavLink href="/gallery">Gallery</NavLink>
              <NavLink href="/leaderboard">Leaderboard</NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
