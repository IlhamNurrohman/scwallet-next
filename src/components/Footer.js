import styles from "../styles/Footer.module.css";

const Footer = ({ page }) => {
  return (
    <footer className={styles["footer"]}>
      {page === "landing" ? (
        <div className={styles["top"]}>
          <div className={styles["profile"]}>
            <h1 className={styles["title"]}>SCWallet</h1>
            <p>
              Simplify financial needs and saving much time in banking needs
              with one single app.
            </p>
          </div>
          <hr />
        </div>
      ) : (
        <></>
      )}
      <div className={styles["bottom"]}>
        <div className={styles["contact"]}>
          <p>+62 812 1165 4947</p>
          <p>contact@scwallet.com</p>
        </div>
        <p>2022 SCWallet. All right reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
