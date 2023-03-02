export const createElement = (tegName: string, parentElement: HTMLElement, className?: string): HTMLElement => {
  const element: HTMLElement = document.createElement(`${tegName}`);
  parentElement.append(element);
  if (className) {
    element.className = `${className}`;
  }
  return element;
};