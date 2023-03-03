import "./styles.scss";

class Header {
  create(title: string) {
    const header = document.createElement("h1");
    header.innerHTML = title;
    header.classList.add("header");
    document?.querySelector("body")?.appendChild(header);
  }
}

export default Header;
