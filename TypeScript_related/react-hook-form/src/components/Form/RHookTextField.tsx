import React, { ReactElement } from 'react';
import { TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

interface IReactHookFormTextFieldProps {
    label: string;
    name: string;
    variant?: 'outlined' | 'standard' | 'filled' | undefined;
}

export default function RHookTextField({
    name,
    label,
    variant = 'outlined',
}: IReactHookFormTextFieldProps): ReactElement {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <TextField
            label={label}
            variant={variant}
            error={!!errors[name]}
            helperText={errors[name]?.message ?? ''}
            fullWidth
            margin="dense"
            {...register(name)}
        />
    );
}
