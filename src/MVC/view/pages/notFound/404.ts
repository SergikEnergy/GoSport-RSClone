
function notFound(htmlElem:HTMLElement):string {
  const view = `
  404
  `
  return htmlElem.innerHTML = view;
}

export default notFound;