(function() {
    "use strict";

    
    window.SudokuSolver = function () {

        this.solve = _solve;
        this.validate = _validate;
        this.cloneGrid = _cloneGrid;
        this.test = _test;


        /// implementation /////////

        // (x,y) is the position
        // n is the number that you want to put in
        function _possible(grid, x, y, n) {

            for(var i=0; i < 9; i++) {
                if(grid[x][i] === n) return false;
            }

            for(var j=0; i < 9; j++) {
                if(grid[j][y] === n) return false;
            }

            var x0 = (Math.floor(x/3)) * 3;
            var y0 = (Math.floor(y/3)) * 3;

            for(var z=0; z < 3; z++) {
                for(var t=0; t < 3; t++) {
                    if(grid[x0 + z][y0 + t] === n) return false;
                }
            }

            return true;
        }


        function _solve(grid) {

            if(! _validate(grid)) throw new "Grid is not valid!";

            for(var x=0; x < 9; x++) {
                for(var y=0; y < 9; y++) {

                    if(grid[x][y] === 0) {

                        for(var n=1; n < 10; n++) {
                            if(_possible(grid, x, y, n)) {
                                grid[x][y] = n;

                                var isSolved =_solve(grid);
                                if(isSolved) return grid;

                                grid[x][y] = 0;
                            }
                        }

                        return;
                    }

                }
            }

            return grid;
        }

        function _validate(grid) {
            
            // test data in every cell
            for(var x=0; x < 9; x++) {
                for(var y=0; y < 9; y++) {
                    if(! _isDataInCellValid(grid[x][y])) return false;
                }
            }

            // test duplicates
            for(var x=0; x < 9; x++) {
                for(var y=0; y < 9; y++) {
                    if(_isDataInCellDuplicate(grid, x, y)) return false;
                }
            }

            return true;
        }

        function _isDataInCellValid(value) {
            return value === 0 
            || value === 1
            || value === 2 
            || value === 3 
            || value === 4 
            || value === 5 
            || value === 6 
            || value === 7 
            || value === 8 
            || value === 9 
            || value === null;
        }

        function _isDataInCellDuplicate(grid, x, y) {
            var value = grid[x][y];
            if(value === null || value === 0) return false;

            var gridClone = _cloneGrid(grid);
            gridClone[x][y] = 0;

            var isPossible = _possible(gridClone, x, y, value);
            return !isPossible;
        }

        function _cloneGrid(grid) {
            return JSON.parse(JSON.stringify(grid));
        }



        /// tests /////////

        function _test() {
            var grid = [
                [4, 5, 2, 0, 6, 3, 0, 9, 0],
                [0, 0, 0, 9, 0, 8, 0, 7, 0],
                [0, 0, 0, 5, 1, 0, 0, 0, 4],

                [0, 0, 0, 8, 2, 0, 0, 1, 3],
                [0, 0, 5, 0, 7, 0, 6, 0, 0],
                [1, 2, 0, 0, 9, 5, 0, 0, 0],

                [5, 0, 0, 0, 8, 9, 0, 0, 0],
                [0, 7, 0, 2, 0, 1, 0, 0, 0],
                [0, 8, 0, 4, 5, 0, 1, 3, 6],
            ];

            var solved = _solve(grid);
            if(solved) print(grid);
            else throw "Sudoku cannot be solved!";
        }


        /// helpers /////////

        function print(grid) {
            grid.forEach(function (row) {
                console.log(row);
            });
        }

    }

})();

