// router import
import Router from "./router.js";

// component imports
import DelayMap from "./components/delay-map.js";
import FavoriteDelays from "./components/favorite-delays.js";
import LoginForm from "./components/login-form.js";
import RegisterForm from "./components/register-form.js";
import SingleStation from "./components/single-station.js";
import SingleDelay from "./components/station-delays.js";
import StationList from "./components/station-list.js";
import UseMap from "./components/use-map.js";
import LoginRegister from "./components/login-register.js";


//view imports
import StationView from "./views/station-view.js";
import AboutView from "./views/about-view.js";
import LoginRegView from "./views/loginreg-view.js";
import LoginView from "./views/login-view.js";
import RegisterView from "./views/register-view.js";
import FavoriteView from "./views/favorite-view.js";
import AllView from "./views/all-view.js";
import UseView from "./views/use-view.js";


// navigation import
import Navigation from "./navigation.js";



customElements.define("use-view", UseView)
customElements.define("all-view", AllView);
customElements.define("login-register", LoginRegister);
customElements.define('router-outlet', Router);
customElements.define('navigation-outlet', Navigation);
customElements.define("about-view", AboutView);
customElements.define("station-view", StationView);
customElements.define("loginreg-view", LoginRegView)
customElements.define("delay-map", DelayMap);
customElements.define("favorite-delays", FavoriteDelays);
customElements.define("login-form", LoginForm);
customElements.define("register-form", RegisterForm);
customElements.define("single-station", SingleStation);
customElements.define("station-delays", SingleDelay);
customElements.define("station-list", StationList);
customElements.define("use-map", UseMap);
customElements.define("login-view", LoginView);
customElements.define("register-view", RegisterView);
customElements.define("favorite-view", FavoriteView);

