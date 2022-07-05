import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import styles from '../../styles/Auth.module.css';

import Layout from '../../components/LayoutAuth';
import PageTitle from '../../components/PageTitle';

import { loginAction } from '../../redux/actions/auth';
import { updateUserData } from '../../redux/actions/user';
import { getDetailUser } from '../../modules/api/user';

export default function Login(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const [value, setValue] = useState(false);
  const auth = useSelector((state) => state.auth);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e) => {
    if (e.target.value) setValue(true);
    else setValue(false);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    dispatch(loginAction(body));
  };

  useEffect(() => {
    if (auth.isFulfilled) {
      toast.success('Login success');
      getDetailUser(auth.userData.token, auth.userData.id)
        .then((res) => {
          dispatch(updateUserData(res.data.data));
        })
        .catch((err) => console.log(err));
      if (!auth.userData.pin) router.push('/createpin');
      if (auth.userData.pin) router.push('/dashboard');
    }
    if (auth.isRejected) {
      toast.error('Login error', { autoClose: false });
    }
  }, [auth, dispatch, router]);

  return (
    <>
      <PageTitle title="Login" />

      <Layout>
        <h2 className={styles['h2']}>
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </h2>
        <p className={styles['description']}>
          Transfering money is eassier than ever, you can access SCWallet
          wherever you are. Desktop, laptop, mobile phone? we cover all of that
          for you!
        </p>
        <form className={styles['form']} onSubmit={loginHandler}>
          <div className={styles['email']}>
            <i className="bi bi-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              required
              onChange={handleChange}
            ></input>
          </div>
          <div className={styles['password']}>
            <i className="bi bi-lock"></i>
            <input
              type={passwordShown ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              required
              onChange={handleChange}
            ></input>
            <i
              className={`bi ${passwordShown ? `bi-eye-slash` : `bi-eye`} 
            ${styles['toggle-password']}`}
              onClick={togglePassword}
            ></i>
          </div>
          <div className={styles['link-forgot']}>
            <Link href="/forgot" passHref>
              <a>Forgot password?</a>
            </Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className={styles['link-blue']}>
            Don’t have an account? Let’s{'  '}
            <Link href="/register">
              <a>Register</a>
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
