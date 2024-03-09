import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import "zone.js";

const htmlLayoutData = {
  props: {
    items: [
      {
        id: 1,
        name: "Potato"
      },
      {
        id: 2,
        name: "Lettuce"
      }
    ]
  },
  loaders: {
    spaLoader: `<div class="spa-loader-wrap"><span class="spa-loader">Load&nbsp;ng</span></div>`,
  }
}

const routes = constructRoutes(microfrontendLayout, htmlLayoutData);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
