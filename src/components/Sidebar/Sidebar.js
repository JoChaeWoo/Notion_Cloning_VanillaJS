import DocumentList from "./DocumentList.js";
import SidebarFooter from "./SidebarFooter.js";
import SidebarHeader from "./SideberHeader.js";

export default function Sidebar({ $target, store }) {
  const $sidebar = document.createElement('div');
  $sidebar.className = 'sidebar';
  $target.appendChild($sidebar);
  this.init = () => {
    new SidebarHeader({ $target: $sidebar });
    new DocumentList({ $target: $sidebar, store });
    new SidebarFooter({ $target: $sidebar, store });
  }
  this.init();
}
