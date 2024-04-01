import cn from 'classnames';
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const ButtonTheme = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    WHITE: 'white',
    BLACK: 'black',
} as const;

type TButtonTheme = (typeof ButtonTheme)[keyof typeof ButtonTheme];

const ButtonSize = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
} as const;

export type TButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

const ButtonRound = {
    NONE: 'none',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    FULL: 'full',
} as const;

type TButtonRound = (typeof ButtonRound)[keyof typeof ButtonRound];

const ButtonVariant = {
    SOLID: 'solid',
    OUTLINE: 'outline',
    GHOST: 'ghost',
} as const;

type TButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

const buttonStyleDefault = {
    [ButtonVariant.SOLID]: 'border-none',
    [ButtonVariant.OUTLINE]: 'border border-solid ',
    [ButtonVariant.GHOST]: 'border-none bg-transparent',
};

const buttonStyleByTheme = {
    [ButtonVariant.SOLID]: {
        [ButtonTheme.PRIMARY]:
            'bg-primary text-theme-white hover:bg-primary-variant-1 active:bg-primary-variant-2',
        [ButtonTheme.SECONDARY]:
            'bg-secondary text-theme-white hover:bg-secondary-variant-1 active:bg-secondary-variant-2',
        [ButtonTheme.WHITE]:
            'bg-theme-white text-theme-black hover:bg-theme-white-variant-1 active:bg-theme-white-variant-2',
        [ButtonTheme.BLACK]:
            'bg-theme-black text-theme-white hover:bg-theme-black-variant-1 active:bg-theme-black-variant-2',
    },
    [ButtonVariant.OUTLINE]: {
        [ButtonTheme.PRIMARY]:
            'border-primary text-primary hover:border-primary-variant-1 active:border-primary-variant-2',
        [ButtonTheme.SECONDARY]:
            'border-secondary text-secondary hover:border-secondary-variant-1 active:border-secondary-variant-2',
        [ButtonTheme.WHITE]:
            'border-theme-white text-theme-white hover:border-theme-white-variant-1 active:border-theme-white-variant-2',
        [ButtonTheme.BLACK]:
            'border-theme-black text-theme-black hover:border-theme-black-variant-1 active:border-theme-black-variant-2',
    },
    [ButtonVariant.GHOST]: {
        [ButtonTheme.PRIMARY]:
            'text-primary hover:bg-primary/10 active:bg-primary/20',
        [ButtonTheme.SECONDARY]:
            'text-secondary hover:bg-secondary/10 active:bg-secondary/20',
        [ButtonTheme.WHITE]:
            'text-theme-white hover:bg-theme-white/10 active:bg-theme-white/20',
        [ButtonTheme.BLACK]:
            'text-theme-black hover:bg-theme-black/10 active:bg-theme-black/20',
    },
};

const buttonStyleActiveByTheme = {
    [ButtonVariant.SOLID]: {
        [ButtonTheme.PRIMARY]: 'bg-primary-variant-2',
        [ButtonTheme.SECONDARY]: 'bg-secondary-variant-2',
        [ButtonTheme.WHITE]: 'bg-theme-white-variant-2',
        [ButtonTheme.BLACK]: 'bg-theme-black-variant-2',
    },
    [ButtonVariant.OUTLINE]: {
        [ButtonTheme.PRIMARY]: 'border-primary-variant-2',
        [ButtonTheme.SECONDARY]: 'border-secondary-variant-2',
        [ButtonTheme.WHITE]: 'border-theme-white-variant-2',
        [ButtonTheme.BLACK]: 'border-theme-black-variant-2',
    },
    [ButtonVariant.GHOST]: {
        [ButtonTheme.PRIMARY]: 'bg-primary/20',
        [ButtonTheme.SECONDARY]: 'bg-secondary/20',
        [ButtonTheme.WHITE]: 'bg-theme-white/20',
        [ButtonTheme.BLACK]: 'bg-theme-black/20',
    },
};

const buttonSize = {
    [ButtonSize.SM]: 'py-2 px-2 text-sm',
    [ButtonSize.MD]: 'py-3 px-3 text-md',
    [ButtonSize.LG]: 'py-4 px-4 text-md',
};

type Props = {
    variant?: TButtonVariant;
    size?: TButtonSize;
    rounded?: TButtonRound;
    isDisabled?: boolean;
    isActive?: boolean;
    fullWidth?: boolean;
    uppercase?: boolean;
    className?: string;
    arrowClassName?: string;
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    theme?: TButtonTheme;
};

export type ButtonType = Props &
    DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >;

export const Button = ({
    children,
    className,
    arrowClassName,
    variant = ButtonVariant.SOLID,
    fullWidth = false,
    uppercase = false,
    size = ButtonSize.SM,
    rounded = ButtonRound.LG,
    isDisabled,
    isActive,
    theme = ButtonTheme.PRIMARY,
    prefixIcon,
    suffixIcon,
    ...rest
}: ButtonType) => {
    return (
        <button
            disabled={isDisabled}
            className={cn(
                `rounded-${rounded} text-center text-base duration-150`,
                'disabled:pointer-events-none disabled:bg-theme-white-variant-3 disabled:border-transparent disabled:bg-black/20 disabled:text-theme-black/30 disabled:hover:shadow-none disabled:text-white',
                {
                    'w-full': fullWidth,
                    uppercase: uppercase,
                    [buttonStyleDefault[variant]]: true,
                    [buttonStyleByTheme[variant][theme]]: true,
                    [buttonSize[size]]: true,
                    [buttonStyleActiveByTheme[variant][theme]]: isActive,
                    [className || '']: !!className,
                    'flex items-center space-x-2': suffixIcon || prefixIcon,
                    '!max-h-14': variant === ButtonVariant.OUTLINE,
                }
            )}
            {...rest}
        >
            {prefixIcon}
            {typeof children === 'string' ? (
                <span
                    className={cn('text-inherit', {
                        'flex-1': suffixIcon,
                    })}
                >
                    {children}
                </span>
            ) : (
                children
            )}
            {suffixIcon}
        </button>
    );
};

export default Button;
