import React, { memo } from 'react';
import { TextField } from '@material-ui/core';
import { UseFormReturn } from 'react-hook-form';
import { IReactHookFormTextFieldContainerProps } from './RHookTextFieldContainer';

export interface IReactHookTextFieldProps {
    methods: UseFormReturn;    
    name: string;
    label: string;
}
const RHookTextFieldMemo = memo(
    ({ methods, label, name, ...others }: IReactHookTextFieldProps) => (
        <TextField
            label={label}
            error={!!methods.formState.errors[name]}
            helperText={methods.formState.errors[name]?.message ?? ''}
            fullWidth
            margin="dense"
            {...methods.register(name)}
            {...others}
        />
    ),
    (prevProps, nextProps) => {
        return (
            prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty &&
            prevProps.methods.formState.errors !== nextProps.methods.formState.errors
        );
    },
);

RHookTextFieldMemo.displayName = 'RHookTextFieldMemo';

export default RHookTextFieldMemo;
