import Logo from "../../../assets/images/logo.png";
import Image from "next/image";
import classes from "./Header.module.css";
import Button from "../../UI/Button";
import Link from "next/link";
import useWallet from "../../hooks/useWallet";

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
        </div>
      </div>
    </header>
  );
};

export default Header;
