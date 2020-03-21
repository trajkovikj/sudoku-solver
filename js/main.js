var sudokuSolver = new SudokuSolver();

var errorMessageSelector = document.getElementsByClassName("error-message")[0];

var columnSelectors = document.getElementsByClassName("column");
var columnsSelectorGrid = buildColumnSelectorGrid(columnSelectors);
var inputSelectorGrid = columnsSelectorGrid.map(function (row) {
    return row.map(function (column) {
        return column.children[0];
    });
})



/// click handlers /////////

function solveGrid() {
    errorMessageSelector.style.display = "none";

    var valuesGrid = getValuesGrid();
    var isGridValid = sudokuSolver.validate(valuesGrid);

    if (!isGridValid) {
        // show error message
        errorMessageSelector.style.display = "flex";
        return;
    }

    // change color of null cells
    iterateGrid(inputSelectorGrid, function (column) {
        if (column.value === "" || column.value === null) {
            column.style.color = "#9C27B0";
            column.style.backgroundColor = "#FFF176";
        }
    });

    var clonedGrid = sudokuSolver.cloneGrid(valuesGrid);
    iterateGridByIndex(clonedGrid, function (currentGrid, x, y) {
        if (currentGrid[x][y] === null) currentGrid[x][y] = 0;
    });

    var solvedGrid = sudokuSolver.solve(clonedGrid);

    // show solved grid
    applyInputSelectorGridValues(solvedGrid);
}

function clearGrid() {
    errorMessageSelector.style.display = "none";
    iterateGrid(inputSelectorGrid, function (column) {
        column.value = null;
        column.style.color = "#616161";
        column.style.backgroundColor = "#fff";
    });
}

function prepopulateGrid() {
    var grid = [
        [4, 5, 2, null, 6, 3, null, 9, null],
        [null, null, null, 9, null, 8, null, 7, null],
        [null, null, null, 5, 1, null, null, null, 4],

        [null, null, null, 8, 2, null, null, 1, 3],
        [null, null, 5, null, 7, null, 6, null, null],
        [1, 2, null, null, 9, 5, null, null, null],

        [5, null, null, null, 8, 9, null, null, null],
        [null, 7, null, 2, null, 1, null, null, null],
        [null, 8, null, 4, 5, null, 1, 3, 6],
    ];

    applyInputSelectorGridValues(grid);
}





/// helpers /////////


function buildColumnSelectorGrid(columnSelectors) {
    var rowsCount = 9;
    var columnsCount = 9;

    var result = buildNullMatrix(rowsCount, columnsCount);

    for (var i = 0; i < rowsCount; i++) {
        for (var j = 0; j < columnsCount; j++) {
            result[i][j] = columnSelectors[calculateOffset(i, columnsCount) + j];
        }
    }

    return result;
}

function calculateOffset(page, itemsPerPage) {
    return page * itemsPerPage; // not zero based index - (page - 1) * itemsPerPage + 1
}

function buildNullMatrix(rowsCount, columnsCount) {
    var result = [];

    for (var i = 0; i < rowsCount; i++) {
        result.push(buildNullArray(columnsCount));
    }

    return result;
}

function buildNullArray(count) {
    var result = [];

    for (var i = 0; i < count; i++) {
        result.push(null);
    }

    return result;
}


function getValuesGrid() {
    return inputSelectorGrid.map(function (row) {
        return row.map(function (column) {
            if(typeof column.value === "string") {
                var castedNumber = Number(column.value);
                return isNaN(castedNumber) || castedNumber === 0 ? null : castedNumber;
            } else if(typeof column.value === "number") return column.value;
            else return null;
        });
    })
}


function iterateGrid(grid, lambda) {
    grid.forEach(function (row) {
        row.forEach(function (column) {
            if (lambda && typeof lambda === "function") lambda(column);
        });
    });
}

function iterateGridByIndex(grid, lambda) {
    for(var x=0; x < grid.length; x++) {
        for(var y=0; y < grid[0].length; y++) {
            if (lambda && typeof lambda === "function") lambda(grid, x, y);
        }
    }
}

function applyInputSelectorGridValues(sourceGrid) {
    for (var i = 0; i < sourceGrid.length; i++) {
        for (var j = 0; j < sourceGrid[0].length; j++) {
            inputSelectorGrid[i][j].value = sourceGrid[i][j];
        }
    }

}