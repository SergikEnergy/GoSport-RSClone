
function prod(htmlElem:HTMLElement):string {
  const view = `
  prod
    <a href="#/">Main</a>
  `
  return htmlElem.innerHTML = view;
}

export default prod;