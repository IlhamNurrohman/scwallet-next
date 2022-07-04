import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className={styles['main']}>
      <Head>
        <meta
          name="description"
          content="Landing page of Zwallet, a money transfer app."
        />
      </Head>

      <nav className={`${styles['navbar']}`}>
        <Link href="/" passHref>
          SCWallet
        </Link>
        <div className={styles['nav-right']}>
          <Link href="/login" passHref>
            <button className={styles['login']}>Login</button>
          </Link>
          <Link href="/register" passHref>
            <button className={styles['register']}>Register</button>
          </Link>
        </div>
      </nav>
      <section className={styles['banner-container']}>
        <header className={styles['header']}>
          <h1 className={styles['title']}>
            Awesome App
            <br />
            For Saving Time.
          </h1>
          <p>
            We bring you a mobile app for banking problems that oftenly wasting
            much of your times.
          </p>
          <Link href="/login">
            <a>
              <button className={styles['button']}>Try it Free</button>
            </a>
          </Link>
        </header>
        <div className={styles['img']}></div>
      </section>
      <section className={styles['about-container']}>
        <h1 className={styles['title']}>
          <span style={{color: 'var(--primary)'}}>About </span>the Application.
        </h1>
        <p className={styles['about-description']}>
          We have some great features from the application and it’s totally free
          to use by all users around the world.
        </p>
        <div className={styles['about-features']}>
          <div className={styles['about-feature']}>
            <div className={styles['background-image']}>
              <div className={styles['img']}>
                <Image
                  src={'/icons/phone.png'}
                  alt="phone"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <h2>24/7 Support</h2>
            <p>
              We have 24/7 contact support so you can contact us whenever you
              want and we will respond it.
            </p>
          </div>
          <div className={styles['about-feature']}>
            <div className={styles['background-image']}>
              <div className={styles['img']}>
                <Image
                  src={'/icons/privacy.png'}
                  alt="phone"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <h2>Data Privacy</h2>
            <p>
              We make sure your data is safe in our database and we will encrypt
              any data you submitted to us.
            </p>
          </div>
          <div className={styles['about-feature']}>
            <div className={styles['background-image']}>
              <div className={styles['img']}>
                <Image
                  src={'/icons/download.png'}
                  alt="phone"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <h2>Easy Download</h2>
            <p>
              SCWallet is 100% totally free to use it’s now available on Google
              Play Store and App Store.
            </p>
          </div>
        </div>
      </section>
      <section className={styles['partners-container']}>
        <div className={styles['partners-detail']}>
          <h1 className={styles['title']}>
            100+ <span style={{color: 'var(--primary)'}}>Trusted</span>
            <br />
            Partners
          </h1>
          <p>
            We have reached global level and have 100+ brand partners around the
            globe.
          </p>
        </div>
        <div className={styles['partners']}>
          <div className={styles['img']}>
            <Image
              alt="airbnb"
              src={'/icons/airbnb.png'}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles['img']}>
            <Image
              alt="airbnb"
              src={'/icons/canon.png'}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles['img']}>
            <Image
              alt="airbnb"
              src={'/icons/dell.png'}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles['img']}>
            <Image
              alt="airbnb"
              src={'/icons/microsoft.png'}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles['img']}>
            <Image
              alt="airbnb"
              src={'/icons/dropbox.png'}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles['img']}>
            <Image
              alt="airbnb"
              src={'/icons/hnm.png'}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </section>
      <section className={styles['features-container']}>
        <div className={styles['features-text']}>
          <h1 className={styles['title']}>
            All the
            <span style={{color: 'var(--primary)'}}> Great</span>
            <br />
            Zwallet Features.
          </h1>
          <div className={styles['features-list']}>
            <div className={styles['feature-wrapper']}>
              <p>
                <strong>
                  <span style={{color: 'var(--primary)'}}>1. </span>Small Fee
                </strong>
              </p>
              <p>
                We only charge 5% of every success transaction done in Zwallet
                app.
              </p>
            </div>
            <div className={styles['feature-wrapper']}>
              <p>
                <strong>
                  <span style={{color: 'var(--primary)'}}>2. </span>Data Secured
                </strong>
              </p>
              <p>
                All your data is secured properly in our system and it’s
                encrypted.
              </p>
            </div>
            <div className={styles['feature-wrapper']}>
              <p>
                <strong>
                  <span style={{color: 'var(--primary)'}}>3. </span>User
                  Friendly
                </strong>
              </p>
              <p>
                SCWallet come up with modern and sleek design and not
                complicated.
              </p>
            </div>
          </div>
        </div>
        <div className={styles['img']}>
          {/* <Image
            alt="phone features"
            src={"/images/phone-features.png"}
            layout="fill"
            objectFit="contain"
          /> */}
        </div>
      </section>
      <section className={styles['testimony-container']}>
        <h1 className={styles['title']}>
          What Users are
          <span style={{color: 'var(--primary)'}}> Saying.</span>
        </h1>
        <p className={styles['testimony-description']}>
          Our goal is to fulfil our customers’ needs. Read some testimonies from
          our loyal customers.
        </p>
        <div className={styles['testimonies']}>
          <div className={styles['testimony']}>
            <div className={styles['img']}>
              <Image
                src={'/images/sherina.png'}
                alt="phone"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2>Sherina Chaw</h2>
            <p>
              “I use this app since 2 years ago and this is the best app that
              I’ve ever use in my entire life”
            </p>
          </div>
          <div className={styles['testimony']}>
            <div className={styles['img']}>
              <Image
                src={'/images/jessica.png'}
                alt="phone"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2>Jessica Mera</h2>
            <p>
              “I use Zwallet to manage all financial needs. It’s super easy to
              use and it’s 100% free app”
            </p>
          </div>
          <div className={styles['testimony']}>
            <div className={styles['img']}>
              <Image
                src={'/images/robert.png'}
                alt="phone"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2>Robert Chandler</h2>
            <p>
              “Since I’m using this app, I’m not going to move to another
              similar app. Thank you Zwallet!”
            </p>
          </div>
        </div>
      </section>
      <Footer page="landing" />
    </main>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
