import { defineNuxtPlugin } from "#app";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faMoon,
  faSun,
  faStar,
  faQuestion,
  faArrowDown,
  faArrowRight,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faTiktok,
  faYoutube,
  faLinux,
  faJava,
} from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false;
library.add(
  faSun,
  faMoon,
  faBars,
  faArrowRight,
  faPeopleGroup,
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faTiktok,
  faYoutube,
  faStar,
  faQuestion,
  faArrowDown,
  faLinux,
  faJava
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
