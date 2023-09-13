import cn from 'classnames';
import { ChangeEvent, useRef, useState } from 'react';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';

type InputProps = {
    type?: string;
    label?: string;
    value?: string;
    onChange: (e: string | undefined) => void;
    classname?: string;
    size?: 'md' | 'lg';
    forceUppercase?: boolean;
    error?: string;
    isError?: boolean;
    placeholder?: string;
    prefixIcon?: React.ReactNode;
};

export const Input = ({
    type,
    value,
    onChange,
    placeholder,
    label,
    classname,
    size = 'lg',
    forceUppercase,
    error,
    isError,
    prefixIcon,
}: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        if (type !== 'password') {
            return;
        }
        setIsShowPassword((pre) => !pre);
    };

    function preFormatValue(e: ChangeEvent<HTMLInputElement>) {
        let _value = e.target.value;
        if (forceUppercase) {
            _value = _value.toLocaleUpperCase();
        }
        onChange?.(_value);
    }
    return (
        <div className="relative  ">
            <label
                className=" absolute text-sm text-black left-4 top-0 -translate-y-1/2 bg-transparent bg-white px-1"
                htmlFor={type}
            >
                {label}
            </label>
            <input
                placeholder={placeholder}
                ref={inputRef}
                value={value}
                onChange={preFormatValue}
                type={isShowPassword ? 'text' : type}
                className={cn(
                    'block bg-transparent rounded-md p-3 border border-black/20 w-full focus:outline-none text-sm ring-0 ring-black transition focus:ring-1 focus:border-transparent',
                    isError && 'border-common-error',
                    prefixIcon && 'pl-8',
                    classname
                )}
            />
            {prefixIcon && (
                <div className="max-w-[20px] max-h-[20px] absolute top-0 translate-y-[65%] px-2">
                    {prefixIcon}
                </div>
            )}
            {type === 'password' && (
                <button
                    className="absolute right-0 mx-3 top-0 translate-y-[65%]"
                    onClick={toggleShowPassword}
                >
                    {isShowPassword ? (
                        <BiShow className="w-5 h-5 ring-2" />
                    ) : (
                        <BiHide className="w-5 h-5 " />
                    )}
                </button>
            )}
            {error && (
                <p className="text-xs mt-[2px] text-common-error">{error}</p>
            )}
        </div>
    );
};

export default Input;
