import Router from 'next/router'
import objEvent from './observer'

Router.onRouteChangeStart = url => {
    objEvent.fire('LOADING',true);
}

Router.onRouteChangeComplete = url => {
    objEvent.fire('LOADING',false);
}

Router.onRouteChangeError = url => {
    objEvent.fire('LOADING',false);
}