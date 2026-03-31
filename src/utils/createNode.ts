export function createNode<T extends HTMLElement = HTMLDivElement> (className: string, tag: string = 'div'): T {
  const element: T = document.createElement(tag) as T
  element.classList.add(className)
  return element
}
