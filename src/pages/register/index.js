import {useRouter} from 'next/router';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux';

import styles from '../../styles/Auth.module.css';

import Layout from '../../components/LayoutAuth';
import PageTitle from '../../components/PageTitle';

import {register} from '../../modules/api/auth';

export default function Register(props) {
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);
  const auth = useSelector((state) => state.auth);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const registerHandler = (e) => {
    e.preventDefault();
    const body = {
      firstName: e.target.fname.value,
      lastName: e.target.lname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    register(body)
      .then((response) => {
        // console.log(response);
        toast.success('Register success, redirecting to login page');
        router.push('/login');
      })
      .catch((err) => {
        toast.error('Register error', {autoClose: false});
        console.error(err);
      });
  };

  useEffect(() => {
    if (auth.isFulfilled) {
      router.push('/dashboard');
    }
  }, [auth, router]);

  return (
    <>
      <PageTitle title="Register" />

      <Layout>
        <h2 className={styles['h2']}>
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </h2>
        <p className={styles['description']}>
          Transfering money is easier than ever, you can access SCWallet wherever
          you are. Desktop, laptop, mobile phone? we cover all of that for you!
        </p>
        <form className={styles['form']} onSubmit={registerHandler}>
          <div className={styles['fname']}>
            <i className="bi bi-person"></i>
            <input
              type="text"
              name="fname"
              placeholder="Enter your first name"
              required
            ></input>
          </div>
          <div className={styles['lname']}>
            <i className="bi bi-person"></i>
            <input
              type="text"
              name="lname"
              placeholder="Enter your last name"
              required
            ></input>
          </div>
          <div className={styles['email']}>
            <i className="bi bi-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              required
            ></input>
          </div>
          <div className={styles['password']}>
            <i className="bi bi-lock"></i>
            <input
              type={passwordShown ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              required
            ></input>
            <i
              className={`bi ${passwordShown ? `bi-eye-slash` : `bi-eye`} 
            ${styles['toggle-password']}`}
              onClick={togglePassword}
            ></i>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <div className={styles['link-blue']}>
            Already have an account? Let’s{'  '}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </div>
        </form>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
