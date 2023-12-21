import cn from 'classnames';
import styles from './styles.module.css';
type Props = {
    overlayBackground?: boolean;
};

const LoadingPage = ({ overlayBackground }: Props) => {
    return (
        <div
            className={cn(
                'fixed inset-0 w-full h-full flex flex-row justify-center items-center bg-white z-[100]',
                overlayBackground && '!bg-black/20'
            )}
        >
            <span className={styles.loader}></span>
        </div>
    );
};

export default LoadingPage;
