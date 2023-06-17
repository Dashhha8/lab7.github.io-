export class Cell {
  constructor(gridElement, x, y) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gridElement.append(cell);
    /* сохранение х и у внутри класса */ 
    this.x = x;
    this.y = y;
  }

  linkTile(tile) {
    tile.setXY(this.x, this.y);/* остановка координат плитки*/
    this.linkedTile = tile;
  }

  unlinkTile() { /*перезапись ссылки привязанной плитки*/
    this.linkedTile = null;}

  isEmpty() {/*true или false есть ли в ячейке плитка*/
    return !this.linkedTile;} 

  linkTileForMerge(tile) { 
    tile.setXY(this.x, this.y);/*замена координат плитки на новые*/
    this.linkedTileForMerge = tile;} /*сохранение ссылки на плитку*/

  unlinkTileForMerge() {
    this.linkedTileForMerge = null;}

  hasTileForMerge() {
    return !!this.linkedTileForMerge;}

  canAccept(newTile) {/*может ли переместиться плитка на тек.ячейку (true или false)*/
    return (
      this.isEmpty() || (!this.hasTileForMerge() && this.linkedTile.value === newTile.value)
      );
  }

  mergeTiles() {
    this.linkedTile.setValue(this.linkedTile.value + this.linkedTileForMerge.value);/*сумма двух плиток*/
    this.linkedTileForMerge.removeFromDOM(); /*удаление второй плитки*/
    this.unlinkTileForMerge(); /*отвязка второй плитки от ячейки*/
  }
}
