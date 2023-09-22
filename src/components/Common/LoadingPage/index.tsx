import styles from './loading.module.css';

type Props = {};

const LoadingPage = (props: Props) => {
    return (
        <div className="absolute inset-0 grid place-items-center z-[100] bg-white">
            <div className={styles.ring}></div>
            <div className={styles.ring}></div>
            <div className={styles.ring}></div>
            {/* <span>NOV 27</span> */}
        </div>
    );
};

export default LoadingPage;
