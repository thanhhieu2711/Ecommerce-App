import styles from './styles.module.css';
type Props = {};

const LoadingPage = (props: Props) => {
    return (
        <div className="fixed inset-0 grid place-items-center bg-white">
            <span className={styles.loader}></span>
        </div>
    );
};

export default LoadingPage;
