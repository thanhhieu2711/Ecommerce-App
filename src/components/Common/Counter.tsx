import React from 'react';
import { Button } from '../Common';
import { Input } from 'antd';
import cn from 'classnames';
import { BiMinus, BiPlus } from 'react-icons/bi';
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
                    'w-8 h-8 text-black flex flex-row items-center justify-center hover:bg-opacity-70 border-transparent',
                    buttonClassname,
                    isDisableDecrease &&
                        ' !border-secondary-variant-1 !text-secondary-variant-1 !bg-transparent'
                )}
                variant="outline"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDecrease();
                }}
                disabled={isDisableDecrease}
            >
                <BiMinus />
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
                    'w-8 h-8 text-black flex flex-row items-center justify-center border-none hover:bg-opacity-70',
                    buttonClassname
                )}
                variant="outline"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleIncrease();
                }}
                disabled={isDisableIncrease}
            >
                <BiPlus />
            </Button>
        </div>
    );
};

export default Counter;
