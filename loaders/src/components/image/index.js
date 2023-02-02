import tux from "../../assets/tux.png";

class Image {
  insertTuxImage() {
    const img = `<img src="${tux}" width="200px" height="200px" alt="Tux image" />`;

    document.querySelector("body").innerHTML += img;
  }
}

export default Image;
