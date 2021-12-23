// @flow
import * as React from 'react';
import {useRef, useEffect} from "react";
import './preview.scss'

interface PreviewProps {
    code: string,
    err: string
};

const html = `
<html>
<head>
<style>
html {
background: white;
}
</style>
</head>
<body>
<div id="root"></div>
</body>
<script>
const hanndleError =err=>{
      const root = document.getElementById('root')
      root.innerHTML='<div style="color:red;"><h4>RunTime Error</h4>'+err+'</div>'
      console.error(err)
}

window.addEventListener('error', event=>{
    event.preventDefault()
    hanndleError(event.error)
})

window.addEventListener('message', e=>{
    // console.log(e.data)
     
    try {
      const root = document.getElementById('root')
      root.innerHTML=''
      eval(e.data)   //此方式只抓得到synchronized error
    }catch (e) {
        hanndleError(e)
    }
}, false)
</script>
</html>

`


export const Preview: React.FC<PreviewProps> = ({code, err}) => {
    const myIframe = useRef<any>()

    useEffect(() => {
        myIframe.current.srcDoc = html
        setTimeout(() => {
            myIframe.current.contentWindow.postMessage(code, '*')
        }, 50)

    }, [code])


    return (
        <div className={'preview-wrapper'}>
            <iframe title={'preview'} ref={myIframe} sandbox={'allow-scripts'} srcDoc={html}/>
            {err && <div className={'preview-error'}>{err}</div>}
        </div>
    );
};