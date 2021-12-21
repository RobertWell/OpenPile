import React, { ReactElement } from 'react';
import RHookTextFieldMemo from './RHookTextFieldMemo';
import { useFormContext } from 'react-hook-form';

export interface IReactHookFormTextFieldContainerProps {
    name: string;
    label: string;
    [x: string]: any;
}

export default function RHookTextFieldContainer({
    name,
    label,
    ...others
}: IReactHookFormTextFieldContainerProps): ReactElement {
    const methods = useFormContext();
    return <RHookTextFieldMemo methods={methods} label={label} name={name} {...others} />;
}
