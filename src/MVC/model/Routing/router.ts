import iRoute from "./TStype/iRoute";
import main from '../../view/pages/main/main'
import { afterRenderMainPage } from "../../view/pages/main/main";
import notFound from '../../view/pages/notFound/404';
import prod from '../../view/pages/prod/prod';
//Object with routing pathes and render functions like a value
const routes:iRoute = {
  '/': main,
  '/pr': prod,
}
//Async Router function
const router = async () => {

  const content:HTMLElement | null =  null || document.getElementById('content');

  const url:string = location.hash.slice(1).toLowerCase() || '/'; //Get url hash without first letter'#'
  const pageRender = routes[url] ? routes[url] : notFound; //If url of route does not exist, render 404 page
//Here need to render the footer and header like on example:
if (content !=undefined){
  await pageRender(content);
  await afterRenderMainPage();
}
}
export default router
