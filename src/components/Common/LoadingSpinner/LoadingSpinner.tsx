import styles from './loadingspinner.module.css';

type Props = {};

const LoadingSpinner = (props: Props) => {
    return <span className={styles.loader}></span>;
};

export default LoadingSpinner;
