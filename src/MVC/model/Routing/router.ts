import iRoute from "./TStype/iRoute";
import main from '../../view/pages/main/main'
import notFound from '../../view/pages/notFound/404';
import prod from '../../view/pages/prod/prod';
import { renderHeader } from '../../view/header/header';
import { renderFooter } from '../../view/footer/footer';
import { renderWelcomePopup } from "../../view/welcome-popup/welcome-popup";
//Object with routing pathes and render functions like a value
const body = document.body;
const routes:iRoute = {
  '/': main,
  '/pr': prod,
}
//Async Router function
const router = async () => {
  const header:HTMLElement | null = null || document.getElementById('header');
  const content:HTMLElement | null =  null || document.getElementById('content');
  const footer:HTMLElement | null = null || document.getElementById('footer');

  const url:string = location.hash.slice(1).toLowerCase() || '/'; //Get url hash without first letter'#'
  const pageRender = routes[url] ? routes[url] : notFound; //If url of route does not exist, render 404 page
//Rendering footer and header
if (header != undefined && footer != undefined) {
  await renderHeader(header);
  await renderFooter(footer);
  renderWelcomePopup(body);
}
//Rendering content
if (content !=undefined){
  await pageRender(content);
}
}
export default router
