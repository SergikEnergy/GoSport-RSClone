export default interface iRoute {
  [urlString:string]:(htmlElem: HTMLElement) => string
}