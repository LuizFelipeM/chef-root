import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import { HTMLLayoutData } from "single-spa-layout/dist/types/isomorphic/constructRoutes";

const htmlLayoutData: HTMLLayoutData = {
  errors: {
    errorTemplate: "<h1>Error</h1>"
  },
  loaders: {},
  props: {}
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
