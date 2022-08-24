import { plus } from "../../style/svg.js";
import { actions } from "../../util/constants.js";

export default function SidebarFooter({ $target, store }) {
  const $sidebarFooter = document.createElement('div');
  $sidebarFooter.className = 'sidebar-footer';
  $target.appendChild($sidebarFooter);
  this.init = () => {
    this.render();
    this.events();
  }
  this.render = () => {
    $sidebarFooter.innerHTML = `${plus} 새 페이지`
  }

  this.events = () => {
    $sidebarFooter.addEventListener('click', () => {
      store.dispatch(actions.addRootDocument)
      store.dispatch(actions.displayModalBlock);
    });
  }

  this.init();
}
