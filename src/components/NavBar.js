import Link from 'next/link';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {connect, useSelector} from 'react-redux';

import styles from '../styles/NavBar.module.css';

const NavBar = (props) => {
  const router = useRouter();
  const userData = useSelector((state) => state.auth.userData);

  return (
    <nav className={`${styles['navbar']} `}>
      <Link href="/dashboard" passHref>
        SCWallet
      </Link>
      <div className={styles['nav-right']}>
        <Link href="/profile" passHref>
          <div className={styles['profile']}>
            <div className={styles['img']}>
              <Image
                alt="profile"
                src={
                  props.userData.image
                    ? `${props.userData.image}`
                    : '/images/default.jpg'
                }
                placeholder="blur"
                blurDataURL="/images/default.jpg"
                onError={() => '/images/default.jpg'}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div>
              <p
                className={styles['name']}
              >{`${props.userData.firstName} ${props.userData.lastName}`}</p>
              <p className={styles['phone']}>{props.userData.noTelp || '-'}</p>
            </div>
            <div className={styles['notification-wrapper']}>
              <div className={styles['notification']}></div>
            </div>
          </div>
        </Link>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.auth.userData.id,
    token: state.auth.userData.token,
    userData: state.user.userData,
  };
};

export default connect(mapStateToProps)(NavBar);
