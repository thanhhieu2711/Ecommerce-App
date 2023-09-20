import { Button } from '../Button';
import cn from 'classnames';
type Props = {
    isActive: boolean;
    value: number | string;
    onClick: () => void;
    className?: string;
};

const PaginationItem = ({ isActive, value, onClick, className }: Props) => {
    return (
        <Button
            className={cn('h-10 w-10', className)}
            variant={isActive ? 'solid' : 'outline'}
            theme={isActive ? 'primary' : 'black'}
            onClick={onClick}
        >
            {value}
        </Button>
    );
};

export default PaginationItem;
