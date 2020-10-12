import Bowser from "bowser";

const browser = Bowser.getParser(window.navigator.userAgent);

export default browser;
