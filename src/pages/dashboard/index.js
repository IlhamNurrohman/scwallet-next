import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {connect, useDispatch} from 'react-redux';
import Image from 'next/image';
import {Button, Modal} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {Chart as ChartJS} from 'chart.js/auto';
import {Bar} from 'react-chartjs-2';

import styles from '../../styles/Dashboard.module.css';

import Layout from '../../components/LayoutLoggedIn';
import PageTitle from '../../components/PageTitle';

import currencyPeriod from '../../modules/helpers/currencyPeriod';
import {getHistory} from '../../modules/api/history';
import {getStats} from '../../modules/api/dashboard';
import {topUp} from '../../modules/api/topUp';
import {getDetailUser} from '../../modules/api/user';
import {resetTransferAction} from '../../redux/actions/transfer';
import {updateUserData} from '../../redux/actions/user';

function Card({data}) {
  return (
    <Link href={`/history/${data.id}`} passHref>
      <div className={styles['transaction-item']}>
        <div className={styles['left']}>
          <div className={styles['img']}>
            <Image
              alt="profile"
              src={
                data.image
                  ? `${data.image}`
                  : '/images/default.jpg'
              }
              placeholder="blur"
              blurDataURL="/images/default.jpg"
              onError={() => '/images/default.jpg'}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles['name-type']}>
            <p className={styles['name']}>{data.fullName}</p>
            <p className={styles['type']}>{data.type}</p>
          </div>
        </div>
        <div
          className={`${styles["transaction-amount"]} ${
            data.type === "topup" || data.type === "accept"
              ? styles["green"]
              : styles["red"]
          }`} >
          {data.type === "topup" || data.type === "accept" ? "+" : "-"}Rp.{" "}
          {currencyPeriod(data.amount)}
        </div>
      </div>
    </Link>
  );
}

function Dashboard(props) {
  const dispatch = useDispatch();
  const [historyData, setHistoryData] = useState([]);
  const [userData, setUserData] = useState({});
  const [chartData, setChartData] = useState({});
  const router = useRouter();
  let page, filter;
  page = router.query.page || 1;
  filter = router.query.filter || 'WEEK';

  useEffect(() => {
    getDetailUser(props.token, props.id)
      .then((res) => {
        setUserData(res.data.data);
        if (userData.balance != props.userData.balance) {
          dispatch(updateUserData(res.data.data));
        }
      })
      .catch((err) => console.log(err));
  }, [props.token, props.id, props.userData.balance, dispatch, userData.balance]);

  useEffect(() => {
    if (historyData.length === 0) {
      getHistory(props.token, 4, filter, page)
        .then((res) => {
          console.log(res.data.data);
          setHistoryData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getStats(props.token, props.id)
      .then((res) => {
        setChartData(res.data.data);
      })
      .catch();

    dispatch(resetTransferAction());
  }, [props.token, props.id, filter, page, historyData.length, dispatch]);

  const [shownTopUpModal, setShownTopUpModal] = useState(false);

  const showTopUpModal = () => {
    setShownTopUpModal(true);
  };

  const hideTopUpModal = () => {
    setShownTopUpModal(false);
  };

  const topUpHandler = (e) => {
    e.preventDefault();
    const body = {
      amount: e.target.amount.value,
    };
    // console.log(auth.userData.token);
    topUp(body, props.token)
      .then((res) => {
        toast.info('Redirecting to payment page');
        window.open(
          res.data.data.redirectUrl,
          '_blank' // <- This is what makes it open in a new window.
        );
        getDetailUser(props.token, props.id)
          .then((res) => {
            dispatch(updateUserData(res.data.data));
          })
          .catch((err) => console.log(err));
        router.push('/dashboard');
      })
      .catch((err) => {
        toast.error('Top up error.', {autoClose: false});
        console.log(err);
      });
  };

  // console.log(chartData.listIncome[5].total)

  const incomeData = {
    label: 'Income',
    data: chartData.listIncome
      ? [
          chartData.listIncome[5].total,
          chartData.listIncome[6].total,
          chartData.listIncome[0].total,
          chartData.listIncome[1].total,
          chartData.listIncome[2].total,
          chartData.listIncome[3].total,
          chartData.listIncome[4].total,
        ]
      : [],
    backgroundColor: '#6379F4',
  };

  const expenseData = {
    label: 'Expense',
    data: chartData.listIncome
      ? [
          chartData.listExpense[5].total,
          chartData.listExpense[6].total,
          chartData.listExpense[0].total,
          chartData.listExpense[1].total,
          chartData.listExpense[2].total,
          chartData.listExpense[3].total,
          chartData.listExpense[4].total,
        ]
      : [],
    backgroundColor: '#9DA6B5',
  };

  const data = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [incomeData, expenseData],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    legend: {
      label: {
        fontSize: 14,
        fontFamily: 'Nunito Sans',
      },
    },
  };

  return (
    <>
      <PageTitle title="Dashboard" />

      <Layout>
        <section className={styles['main-container']}>
          <div className={styles['balance-container']}>
            <div className={styles['left']}>
              <p>Balance</p>
              <h1 className={styles['balance']}>
                Rp.{' '}
                {userData.balance
                  ? currencyPeriod(userData.balance)
                  : currencyPeriod(props.userData.balance)}
              </h1>
              <p>{userData.noTelp || props.userData.noTelp || '-'}</p>
            </div>
            <div className={styles['right']}>
              <button onClick={() => router.push('/transfer')}>
                <i className={`bi bi-arrow-up`}></i> Transfer
              </button>
              <button onClick={showTopUpModal}>
                <i className={`bi bi-plus-lg`}></i> Top Up
              </button>
            </div>
          </div>
          <div className={styles['bottom-container']}>
            <div className={styles['graph-container']}>
              <div className={styles['income-expense']}>
                <div className={styles['income']}>
                  <i className="bi bi-arrow-down-short"></i>
                  <p className={styles['type']}>Income</p>
                  <p className={styles['name']}>
                    {`Rp. ${
                    chartData.totalIncome
                      ? currencyPeriod(chartData.totalIncome)
                      : '0'
                  }`}
                  </p>
                </div>
                <div className={styles['expense']}>
                  <i className="bi bi-arrow-up-short"></i>
                  <p className={styles['type']}>Expense</p>
                  <p className={styles['name']}>
                    {`Rp. ${
                    chartData.totalExpense
                      ? currencyPeriod(chartData.totalExpense)
                      : '0'
                  }`}
                  </p>
                </div>
              </div>
              <div className={styles['graph']}>
                <Bar data={data} options={chartOptions} />
              </div>
            </div>
            <div className={styles['history-container']}>
              <div className={styles['header']}>
                <p className={styles['title']}>Transaction History</p>
                <Link href="/history">
                  <a className={styles['see-all']}>See all</a>
                </Link>
              </div>
              <div className={styles['transaction-list']}>
                {historyData.length === 0 && (
                  <div>
                    No transaction made, made one by top up or transfer now!
                  </div>
                )}
                {historyData.length > 0 &&
                  historyData.map((data, idx) => (
                    <Card data={data} key={idx} />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
      <Modal
        show={shownTopUpModal}
        onHide={hideTopUpModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Topup</Modal.Title>
        </Modal.Header>
        <form onSubmit={topUpHandler}>
          <Modal.Body>
            <p>Enter the amount of money, and click submit</p>
            <input
              className={styles['input-amount']}
              type="text"
              name="amount"
            ></input>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.userData.id,
    token: state.auth.userData.token,
    userData: state.user.userData,
  };
};

export default connect(mapStateToProps)(Dashboard);
