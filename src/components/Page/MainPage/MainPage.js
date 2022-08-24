export default function MainPage({ $target }) {
  const $mainPage = document.createElement('div');
  $mainPage.className = 'main-page';
  $mainPage.innerHTML = `
    <h1>어서오세요!</h1>
    <br>
    <h4>KIKO의 NOTION입니다.</h4>
    <h4>자유롭게 글을 쓰고 관리해 보세요!</h4>
    `
  this.render = () => {
    $target.appendChild($mainPage);
  }
}
