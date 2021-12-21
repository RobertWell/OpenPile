import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SubComponent1 from './SubComponent1';
import SubComponent2 from './SubComponent2';

interface IFormProps {
    email: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
});

const Form1 = () => {
    const methods = useForm<IFormProps>({
        resolver: yupResolver(schema),
    });

    const formSubmitHandler: SubmitHandler<IFormProps> = (data: IFormProps) => {
        const { email, password } = data;
        console.log(email, password);
    };




    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
                    <SubComponent1 />
                    <SubComponent2 />
                    <br />

                    <br />
                    <input type="submit" />
                </form>
            </FormProvider>
        </div>
    );
};

export default Form1;
