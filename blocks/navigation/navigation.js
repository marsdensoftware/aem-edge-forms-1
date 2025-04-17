export default function decorate(block) {
  const [navigationWrapper] = block.children;

  const nav = document.createElement('nav');
  nav.textContent = navigationWrapper.textContent.trim();
  navigationWrapper.replaceChildren(nav);
}
