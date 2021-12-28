import React, {useRef} from 'react'
import {Toast} from 'primereact/toast'
import {Button} from 'primereact/button'

const MyToast = () => {

    const toastRef = useRef(null)
    const onButtonClick  = () => {
        
    }
    return (
        <div>
            <Toast ref={toastRef}/>
            <Button type="button"  label="Submit" />
        </div>
    )
}


export default MyToast