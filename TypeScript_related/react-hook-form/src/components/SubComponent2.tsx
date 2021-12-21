import React, { ReactElement } from 'react';
import {useFormContext,  Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
interface Props {}

function SubComponent2({}: Props): ReactElement {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    return (
        <div>
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="password"
                        variant={'outlined'}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                )}
            />
        </div>
    );
}

export default SubComponent2;
