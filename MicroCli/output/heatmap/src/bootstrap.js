import {createApp} from 'vue';
import App from "./App";


const mount = (el) => {
    const app = createApp(App);
    app.mount(el);
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.getElementById('_heatmap-dev-root');

    if (devRoot) {
        mount(devRoot);
    }
}


export {mount};