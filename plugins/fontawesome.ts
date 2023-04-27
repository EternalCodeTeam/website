import { defineNuxtPlugin } from "#app";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faGithub, faInstagram, faLinkedin, faTiktok, faYoutube, } from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false;
library.add(
    faSun,
    faMoon,
    faBars,
    faDiscord,
    faGithub,
    faInstagram,
    faLinkedin,
    faTiktok,
    faYoutube
);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
