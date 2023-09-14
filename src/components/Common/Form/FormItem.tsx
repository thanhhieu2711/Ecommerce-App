'use client';

import React, { cloneElement } from 'react';
import {
    Noop,
    RefCallBack,
    RegisterOptions,
    useController,
    useFormContext,
} from 'react-hook-form';
export type PassPropsType<TValue = unknown> = {
    name?: string;
    onBlur?: Noop;
    onChange?: (event: TValue | undefined) => void;
    value?: TValue;
    isError?: boolean;
    isDirty?: boolean;
    id?: string | undefined;
    ref?: RefCallBack;
    placeholder?: string | undefined;
};

export type FormItemProps = {
    rules?: Omit<
        RegisterOptions,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    name: string;
    id?: string;
    value?: string | ReadonlyArray<string> | number | undefined;
    placeholder?: string | undefined;
    children?: React.ReactNode | ((data: PassPropsType) => React.ReactNode);
};

export function FormItem({
    name,
    rules,
    id,
    children,
    value,
    placeholder,
}: FormItemProps) {
    const { control } = useFormContext();
    const {
        field: { onChange, onBlur, name: _name, value: _value, ref },
        fieldState: { isTouched, isDirty, error },
    } = useController({
        name,
        control,
        rules,
    });

    const passProps: PassPropsType = {
        name: _name,
        onBlur,
        onChange,
        value: value || _value,
        isError: !!error,
        isDirty,
        id,
        ref,
        placeholder,
    };

    if (typeof children == 'function') {
        return children(passProps);
    }

    return (
        <>
            {children &&
                cloneElement(children as any, {
                    name: _name,
                    onBlur,
                    onChange,
                    value: value || _value,
                    isError: !!error,
                    isDirty,
                    id,
                    ref,
                    placeholder,
                })}
        </>
    );
}

export default FormItem;
