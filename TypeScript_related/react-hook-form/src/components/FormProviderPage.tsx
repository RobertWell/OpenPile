import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField } from '@material-ui/core';
import RHookTextFieldContainer from './Form/RHookTextFieldContainer'
import { SubmitHandler, FormProvider, useForm } from 'react-hook-form';
import { SchemaOf, string, object } from 'yup';

interface IFormProps {
    name: string;
    message: string;
}

const formSchema: SchemaOf<IFormProps> = object({
    name: string().required('Name is required'),
    message: string().required('Message is required'),
});

const submitRecipe: SubmitHandler<IFormProps> = async (data: IFormProps) => {
    console.log('data submited', data);
};

const FormProviderPage = () => {
    const methods = useForm<IFormProps>({
        resolver: yupResolver(formSchema),
    });
    return (
        <>
            <Grid container>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(submitRecipe)}>
                        <Grid item>
                            <RHookTextFieldContainer name={'name'} label="name" variant='outlined' />
                        </Grid>
                        <Grid item>
                            <RHookTextFieldContainer name={'message'} label="message" variant='outlined'/>
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="outlined" color='primary'>
                                Submit
                            </Button>
                        </Grid>
                    </form>
                </FormProvider>
            </Grid>
        </>
    );
};

export default FormProviderPage;
