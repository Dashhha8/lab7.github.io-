export class Tile {
  constructor(gridElement) {
    this.tileElement = document.createElement("div");
    this.tileElement.classList.add("tile");
    this.setValue(Math.random() > 0.5 ? 2 : 4); /* значение начальных плиток рандомно 2 или 4 */
    gridElement.append(this.tileElement);
  }

  setValue(value) {
    this.value = value;
    this.tileElement.textContent = value; /*добавление полученного рандома текстом */
    const bgLightness = 100 - Math.log2(value) * 9; /* логика изменения тонов цвета */
    this.tileElement.style.setProperty("--bg-lightness", `${bgLightness}%`);
  }

  setXY(x, y) { /* изменение значений х и у внутри плитки на новые */
    this.x = x;
    this.y = y;
    this.tileElement.style.setProperty("--x", x); /* css */
    this.tileElement.style.setProperty("--y", y);
  }

  removeFromDOM() {this.tileElement.remove();}
}
