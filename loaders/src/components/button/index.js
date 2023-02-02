import "./styles.scss";

class Button {
  create() {
    const button = document.createElement("button");
    button.textContent = "Click";
    button.classList.add("btn");
    document.querySelector("body").appendChild(button);
  }
}

export default Button;
