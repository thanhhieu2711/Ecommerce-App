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
            className={cn(
                'h-10 w-10 hover:bg-primary/20 hover:!border-transparent',
                isActive && '!text-white',

                className
            )}
            variant={isActive ? 'solid' : 'outline'}
            theme={isActive ? 'primary' : 'white'}
            onClick={onClick}
            disabled={isActive}
        >
            {value}
        </Button>
    );
};

export default PaginationItem;
