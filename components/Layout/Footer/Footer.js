import Logo from "../../../assets/images/logo.png";
import Image from "next/image";
import classes from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className="container">
        <div className={classes.FooterContentWrapper}>
          <div>
            <div className={classes.LogoWrapper}>
              <Link href="/">
                <a>
                  <Image src={Logo.src} alt="logo" width={58} height={40} />
                </a>
              </Link>
            </div>
            <div>
              <p> @2021-2022 All Rights Reserved.</p>
              <p>High Premium Diamonds Club.</p>
            </div>
          </div>
          <div>
            <p className={classes.Contribute}>Made with 💜 on Solana</p>
            <div className={classes.LinksWrapper}>
              <Link href="/">Terms</Link>
              <Link href="/">Privacy</Link>
              <Link href="/">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
