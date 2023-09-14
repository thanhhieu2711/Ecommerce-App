'use client';
import cn from 'classnames';
import { ReactNode } from 'react';

import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    UseFormReturn,
} from 'react-hook-form';

type FormProps<TFormValues extends FieldValues> = {
    onSubmit: SubmitHandler<TFormValues>;
    children: ReactNode;
    methods: UseFormReturn<TFormValues>;
    className?: string;
};

export function Form<
    TFormValues extends Record<string, any> = Record<string, any>
>({ children, onSubmit, methods, className }: FormProps<TFormValues>) {
    return (
        <FormProvider {...methods}>
            <form
                noValidate
                onSubmit={methods.handleSubmit(onSubmit)}
                className={cn(className)}
            >
                {children}
            </form>
        </FormProvider>
    );
}

export default Form;
