export default function SidebarHeader({ $target }) {
  const $sidebarHeader = document.createElement('div');
  $sidebarHeader.className = 'sidebar-header';
  $target.appendChild($sidebarHeader);

  this.render = () => {
    $sidebarHeader.innerHTML = `
      <div classname="sidebar-header-title">KIKO's Notion</div>
    `
  }

  this.render();
}
