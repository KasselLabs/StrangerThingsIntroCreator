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
    const isSafari = browser.is('safari');
    if(isSafari){
      swal("Safari is incompatible", "Sorry but this website may have issues when running in Safari. For best experiencie try to use it on Chrome.", "error");
    }
  }

  modalAlreadyShow = true;
};

export default verifyBrowser;