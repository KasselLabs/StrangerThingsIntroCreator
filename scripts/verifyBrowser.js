import Bowser from "bowser";

import swal from './swal';

const browser = Bowser.getParser(window.navigator.userAgent);

let modalAlreadyShow = false;

const verifyBrowser = (props) => {
  if(modalAlreadyShow) {
    return;
  }

  const canShowBrowserAlert = !props.download && !props.edit;

  if(canShowBrowserAlert) {
    const isIOS = browser.is('ios');
    if(isIOS){
      swal("iOS is incompatible", "Sorry but this website doesn't work on iOS devices. For best experiencie try to use it on Chrome on a desktop device.", "error").then(()=>{},()=>{});
      modalAlreadyShow = true;
      return;
    }

    const isSafari = browser.is('safari');
    if(isSafari){
      swal("Safari is incompatible", "Sorry but this website may have issues when running in Safari. For best experiencie try to use it on Chrome.", "error").then(()=>{},()=>{});
    }
  }

  modalAlreadyShow = true;
};

export default verifyBrowser;
