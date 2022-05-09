'use strict';
import './style.css'
import { Keyboard } from './modules/keyboard';

const keyboard = new Keyboard()

window.addEventListener("DOMContentLoaded", function () {
   keyboard.init();
})

console.log(keyboard);