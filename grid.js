import { Cell } from "./cell.js";

const GRID_SIZE = 4; 
const CELLS_COUNT = GRID_SIZE * GRID_SIZE; /* кол-во ячеек 4х4*/

export class Grid {
  constructor(gridElement) {
    this.cells = [];/*заполнение массива 16-ю ячейками */
    for (let i = 0; i < CELLS_COUNT; i++) {
      this.cells.push( /* добавление новой ячейки методом push */
        new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE)));/* (добавление ячейки, положение ячейки) */
    }
    /* сдвиг плиток вверх,вниз,влево,вправо, с помощью группировки массива*/
    this.cellsGroupedByColumn = this.groupCellsByColumn();
    this.cellsGroupedByReversedColumn = this.cellsGroupedByColumn.map(column => [...column].reverse());
    this.cellsGroupedByRow = this.groupCellsByRow();
    this.cellsGroupedByReversedRow = this.cellsGroupedByRow.map(raw => [...raw].reverse());
  }

  getRandomEmptyCell() {
    const emptyCells = this.cells.filter(cell => cell.isEmpty()); /*фильтруем все ячейки и сохраняем только пустые */
    const randomIndex = Math.floor(Math.random() * emptyCells.length);/*достаем случайную ячейку среди всех пустых */
    return emptyCells[randomIndex]; /*возвращаем случайную ячейку */
  }
/* сдвиг массива ячеек столбца вверх */
  groupCellsByColumn() {
    return this.cells.reduce((groupedCells, cell) => {
      groupedCells[cell.x] = groupedCells[cell.x] || [];
      groupedCells[cell.x][cell.y] = cell;
      return groupedCells; /* возврат измененной группы ячеек */
    }, []);
  }
/* сдвиг массива ячеек столбца влево */
  groupCellsByRow() {
    return this.cells.reduce(
      (groupedCells, cell) => {
        groupedCells[cell.y] = groupedCells[cell.y] || [];
        groupedCells[cell.y][cell.x] = cell;
        return groupedCells;
      }, []);
  }
}
