import Title from "./components/title";
import Image from "./components/image";
import Button from "./components/button";
import navbar from "./templates/navbar.html";

// Import html
import "./templates/styles.scss";
const body = document.querySelector("body");
body.innerHTML += navbar;

// Create components

const title = new Title();
title.create("Hello world");

const image = new Image();
image.insertTuxImage();

const button = new Button();
button.create();
