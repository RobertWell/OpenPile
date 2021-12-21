import React, { ReactElement } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
interface Props {}

export default function SubComponent1({}: Props): ReactElement {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    return (
        <>
            <Controller
                name="email"
                control={control}
                defaultValue="example@google.com"
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email"
                        variant={'outlined'}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                )}
            />
        </>
    );
}
