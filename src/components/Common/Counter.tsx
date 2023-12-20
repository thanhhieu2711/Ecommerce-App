import React from 'react';
import { Button } from '../Common';
import { Input } from 'antd';
import cn from 'classnames';
type Props = {
    defaultValue: number;
    handleIncrease: () => void;
    handleDecrease: () => void;
    onChange: (quantity: number) => void;
    isDisableIncrease?: boolean;
    isDisableDecrease?: boolean;
    isDisableInput?: boolean;
    minValue?: number;
    buttonClassname?: string;
    inputClassname?: string;
    className?: string;
};

const Counter = ({
    defaultValue,
    handleDecrease,
    handleIncrease,
    onChange,
    isDisableIncrease,
    isDisableDecrease,
    isDisableInput,
    minValue,
    buttonClassname,
    inputClassname,
    className,
}: Props) => {
    return (
        <div className={cn('flex flex-row items-center gap-2', className)}>
            <Button
                className={cn(
                    'w-8 h-8 text-white flex flex-row items-center justify-center bg-primary hover:bg-opacity-70 border-transparent',
                    buttonClassname,
                    isDisableDecrease &&
                        ' !border-secondary-variant-1 !text-secondary-variant-1 !bg-transparent'
                )}
                variant="outline"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDecrease();
                }}
                disabled={isDisableDecrease}
            >
                -
            </Button>
            <Input
                disabled={isDisableInput}
                className={cn(
                    'w-11 text-center hover:!border-secondary-variant-2 focus:!border-secondary-variant-2 hover:!ring-secondary-variant-2 focus:!ring-secondary-variant-2',
                    inputClassname,
                    isDisableInput && ' !bg-white !text-black !cursor-default'
                )}
                value={defaultValue}
                onChange={(e) => {
                    const checkNumber = isNaN(Number(e.target.value))
                        ? 1
                        : Number(e.target.value);
                    onChange(checkNumber);
                }}
                onBlur={() => (defaultValue === minValue ? onChange(1) : null)}
                maxLength={2}
            />
            <Button
                className={cn(
                    'w-8 h-8 text-white flex flex-row items-center justify-center bg-primary border-none hover:bg-opacity-70',
                    buttonClassname
                )}
                variant="outline"
                onClick={(e) => {
                    e.stopPropagation();
                    handleIncrease();
                }}
                disabled={isDisableIncrease}
            >
                +
            </Button>
        </div>
    );
};

export default Counter;
