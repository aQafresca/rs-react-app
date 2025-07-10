import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__face}>
        <div className={styles.loader__circle}></div>
      </div>
      <div className={styles.loader__face}>
        <div className={styles.loader__circle}></div>
      </div>
    </div>
  );
};

export default Loader;
