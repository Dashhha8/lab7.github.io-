import { Grid } from "./grid.js"; 
import { Tile } from "./tile.js"; 

const gameBoard = document.getElementById("game-board");
const grid = new Grid(gameBoard);

grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
setupInputOnce();

function setupInputOnce() { /*подписка на нажатие клавиши */
    window.addEventListener("keydown", handleInput, { once: true });
}
/* обработка вводимых данных */
function handleInput(event) {
    switch (event.key) {
        case "ArrowUp":
            if (!canMoveUp()) {/*проверка на возможность сдвига */
                setupInputOnce();/*нет сдвига - не добавлять новую плитку */
                return;}
            moveUp();
            break;

        case "ArrowDown":
            if (!canMoveDown()) {
                setupInputOnce();
                return;}
            moveDown();
            break;

        case "ArrowLeft":
            if (!canMoveLeft()) {
                setupInputOnce();
                return;}
            moveLeft();
            break;

        case "ArrowRight":
            if (!canMoveRight()) {
                setupInputOnce();
                return;}
            moveRight();
            break;

        default:
            setupInputOnce();
            return;
    }

    const newTile = new Tile(gameBoard); /* добавление новой плиитки в рандом ячейку после сдвига*/
    grid.getRandomEmptyCell().linkTile(newTile);

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        alert("Попробуйте снова!")
        return;
    }
    setupInputOnce(); /*подписка на нажатие новой клавиши */
}

/* сдвиг плиток (вверх,вниз,влево,вправо) с помощью группировки массива*/
function moveUp() { slideTiles(grid.cellsGroupedByColumn); }
function moveDown() { slideTiles(grid.cellsGroupedByReversedColumn); }
function moveLeft() { slideTiles(grid.cellsGroupedByRow); }
function moveRight() { slideTiles(grid.cellsGroupedByReversedRow); }

function slideTiles(groupedCells) { /*логика смещения плиток вверх */
    groupedCells.forEach(group => slideTilesInGroup(group,));
    grid.cells.forEach(cell => { /* объединение плиток */
        cell.hasTileForMerge() && cell.mergeTiles() 
    });
}

function slideTilesInGroup(group,) {
    for (let i = 1; i < group.length; i++) {/*просмотр ячеек столбца кроме верхней */
        if (group[i].isEmpty()) { continue; }/*ячейка пустая- прерывание*/

        const cellWithTile = group[i];/* наличие в ячейке плитки */
        let targetCell;
        let j = i - 1; /* просмотр ячеек выше текущей */

        while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) { /* ячейка пустая или с похожим числом */
            targetCell = group[j];
            j--;
        }
        if (!targetCell) { continue; }/*нет ячеек для перемещения- прерывание */
        if (targetCell.isEmpty()) { targetCell.linkTile(cellWithTile.linkedTile); }/*пустая->привязка плитки */
        else { targetCell.linkTileForMerge(cellWithTile.linkedTile); }/* объединение плиток */
        cellWithTile.unlinkTile(); /* убираем плитку из ячейки после перемещения */
    }
}

function canMoveUp() { return canMove(grid.cellsGroupedByColumn); }
function canMoveDown() { return canMove(grid.cellsGroupedByReversedColumn); }
function canMoveLeft() { return canMove(grid.cellsGroupedByRow); }
function canMoveRight() { return canMove(grid.cellsGroupedByReversedRow); }
function canMove(groupedCells) { 
    return groupedCells.some(group => canMoveInGroup(group));}/* проверка на возможность перемещения */

function canMoveInGroup(group) {
    return group.some((cell, index) => {
        if (index === 0) { /*индекс=0 -> самая верхняя ячейка > двигаться вверх нельзя */
            return false;
        }

        if (cell.isEmpty()) { /*ячейка пуста-> нечего двигать*/
            return false;
        }
        const targetCell = group[index - 1];
        return targetCell.canAccept(cell.linkedTile);
    });
}

const button = document.getElementsByTagName('button')[0]
button.addEventListener('click', function () {
    alert('Перезапуск игры') 
    document.location.reload();
})
