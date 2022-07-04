import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {connect, useDispatch} from 'react-redux';

import styles from '../../styles/Transfer.module.css';

import Layout from '../../components/LayoutLoggedIn';
import PageTitle from '../../components/PageTitle';

import {getDetailUser} from '../../modules/api/user';
import {inputTransferData} from '../../redux/actions/transfer';
import currencyPeriod from '../../modules/helpers/currencyPeriod';

function TransferAmount(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [receiverData, setReceiverData] = useState({});
  const [amount, setAmount] = useState(0);
  const receiverId = router.query.receiver;

  useEffect(() => {
    getDetailUser(props.token, receiverId)
      .then((res) => {
        // console.log(res.data.data);
        setReceiverData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.token, receiverId]);

  const submitHandler = (e) => {
    e.preventDefault();
    const date = new Date();
    const data = {
      receiverId: receiverId,
      amount: amount,
      notes: e.target.notes.value,
      date,
      receiverData,
    };
    dispatch(inputTransferData(data));
    router.push('/transfer/confirmation');
  };

  return (
    <>
      <PageTitle title="Transfer Amount" />

      <Layout>
        <div className={styles['main']}>
          <div className={styles['content']}>
            <p className={styles['title']}>Transfer Money</p>
            <div className={styles['contact-item']}>
              <div className={styles['img']}>
                <Image
                  src={'/images/default.jpg'}
                  placeholder={'empty'}
                  alt="profile"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={styles['name-phone']}>
                <p
                  className={styles['name']}
                >{`${receiverData.firstName} ${receiverData.lastName}`}</p>
                <p className={styles['phone']}>{receiverData.noTelp | '-'}</p>
              </div>
            </div>
          </div>
          <form onSubmit={submitHandler} className={styles['form']}>
            <p className={styles['text']}>
              Type the amount you want to transfer and then press continue to
              the next steps.
            </p>
            <input
              type="text"
              name="amount"
              placeholder="Rp. 0.00"
              autoComplete="off"
              className={styles['input-amount']}
              onChange={(e) => setAmount(e.target.value)}
            ></input>
            <p className={styles['balance']}>{`Rp. ${currencyPeriod(
              props.userData.balance
            )} available`}</p>
            <input
              type="text"
              name="notes"
              placeholder="Add some notes."
              autoComplete="off"
              className={styles['input-notes']}
            ></input>
            <button
              type="submit"
              className={`btn btn-primary ${styles['confirm']}`}
            >
              Continue
            </button>
          </form>
        </div>
        {/* <Card /> */}
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.userData.id,
    token: state.auth.userData.token,
    userData: state.user.userData,
    transferData: state.transfer.transferData,
  };
};

export default connect(mapStateToProps)(TransferAmount);
