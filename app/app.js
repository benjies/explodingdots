const PathGrid = (function () {
  return {
    eventListen: () => {
      // Update Grid
      document.getElementById('change-btn').addEventListener('click', () => {
        PathGrid.clearGrid();
        PathGrid.launchGrid();
      });
      //   Get Coords
      document.getElementById('grid').addEventListener('click', (e) => {
        if (e.target.className === 'grid' || e.target.tagName === 'UL') {
          return;
        } else {
          PathGrid.gridPoint(e);
          PathGrid.startPoint(e);
        }
      });
      //   Explode Point Event
      document.getElementById('explode-btn').addEventListener('click', () => {
        PathGrid.explodePoint();
      });
      //   document.getElementById('grid').addEventListener('click', (e) => {
      //     if (e.target.className === 'grid' || e.target.tagName === 'UL') {
      //       return;
      //     } else {
      //       e.target.style = 'background-color: blue;';
      //     }
      //   });
    },
    launchGrid: () => {
      // Get Values
      let cols = document.getElementById('cols').value;
      let rows = document.getElementById('rows').value;
      let grid = document.getElementById('grid');
      // Create Grid Layout
      //   Cols
      for (c = 0; c < cols; c++) {
        //   Create ul
        if (c === 26 || c >= 26) {
          break;
        }
        let col = ``;
        col += `<ul id="col-${c}" x="${c + 1}"></ul>`;
        grid.innerHTML += col;
      }
      //   Rows
      for (r = 0; r < rows; r++) {
        if (r === 26 || r >= 26) {
          break;
        }
        //   Create li
        let row = ``;
        row += `<li id="row-${r}" y="${r + 1}"></li>`;
        // Grab number of Col IDS and append rows to them
        for (i = 0; i < cols; i++) {
          document.getElementById(`col-${i}`).innerHTML += row;
        }
      }
    },
    clearGrid: () => {
      let grid = document.getElementById('grid');
      grid.innerHTML = '';
    },
    gridCords: (e) => {
      let y = e.target.getAttribute('y');
      let x = e.target.parentElement.getAttribute('x');
    },
    // get coord
    gridPoint: (e) => {
      // Get Col and Row ID
      let y = e.target.getAttribute('y');
      let x = e.target.parentElement.getAttribute('x');
      let cords = `(${x}, ${y})`;
      document.getElementById('cords').innerText = cords;
      document.getElementByClassName;
    },
    startPoint: (e) => {
      //
      let grid = document.getElementById('grid');
      startPoint = document.querySelectorAll('.start-point');
      for (i = 0; i < startPoint.length; i++) {
        startPoint[i].classList.remove('start-point');
        startPoint[i].style = '';
      }
      //
      PathGrid.gridCords(e);
      e.target.className = 'start-point';
      e.target.style = 'background-color: green; border-radius: 20px;';
    },
    explodePoint: async () => {
      // Get Nearby Cols and rows
      startPoint = document.querySelector('.start-point');
      startY = startPoint.getAttribute('y');
      leftCol = startPoint.parentElement.previousSibling;
      rightCol = startPoint.parentElement.nextSibling;
      upRow = startPoint.previousSibling;
      downRow = startPoint.nextSibling;

      // Explode nearby cells
      if (leftCol != null) {
        leftRow = leftCol.querySelector(`[y="${startY}"]`);
        leftRow.style = 'background-color: red;';
        leftRow.className = 'exploded';
      }
      if (rightCol != null) {
        rightRow = rightCol.querySelector(`[y="${startY}"]`);
        rightRow.style = 'background-color: red;';
        rightRow.className = 'exploded';
      }
      if (upRow != null) {
        upRow.style = 'background-color: red;';
        upRow.className = 'exploded';
      }
      if (downRow != null) {
        downRow.style = 'background-color: red;';
        downRow.className = 'exploded';
      }

      //   Loop new explosions
      let explodedCells = document.querySelectorAll('.exploded').length;
      let explodedArray = Array.from(document.querySelectorAll('.exploded'));
      let totalCells = document.querySelectorAll(`[id^='row-']`).length;

      //   Timeout that works with loops, timeout() with loops all activate at the same time making it useless. This solves that issue

      const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
      };
      //   For each cell that is not exploded, add one exploded cell
      for (
        explodedCells = 0;
        explodedCells < totalCells;
        explodedCells = explodedCells
      ) {
        //   Timeout that works with loops, timeout() with loops all activate at the same time making it useless. This solves that issue
        await sleep(100);
        //   Loop through Exploded Cells til field is filled
        explodedArray.forEach((explosionCell) => {
          // No click

          //   Set row, cols, and startpoint locations
          let startPoint = document.querySelector('.start-point');
          let leftColExplode = explosionCell.parentElement.previousSibling;
          let rightColExplode = explosionCell.parentElement.nextSibling;
          let upRowExplode = explosionCell.previousSibling;
          let downRowExplode = explosionCell.nextSibling;
          // Start logic
          if (leftColExplode != null) {
            leftExplodeRow = leftColExplode.querySelector(`[y="${startY}"]`);
            leftExplodeRow.className = 'exploded';
          }
          if (rightColExplode != null) {
            rightExplodeRow = rightColExplode.querySelector(`[y="${startY}"]`);
            rightExplodeRow.className = 'exploded';
          }
          if (upRowExplode != null) {
            if (upRowExplode.className === 'wall') {
              return;
            } else if (upRowExplode.className != 'wall') {
              upRowExplode.className = 'exploded';
            }
          }
          if (downRowExplode != null) {
            if (downRowExplode.className === 'wall') {
              return;
            } else if (downRowExplode.className != 'wall') {
              downRowExplode.className = 'exploded';
            }
          }
          //   Calculate new exploded cells
          let newCells = document.querySelectorAll('.exploded').length;
          explodedCells = newCells + 1;
          // Retains original start point
          startPoint.className = 'start-point';
          startPoint.style = 'background-color: blue;';
          return (explodedArray = Array.from(
            document.querySelectorAll('.exploded')
          ));
        });
      }
    },
    wallPoint: () => {},
  };
})();

PathGrid.eventListen();
