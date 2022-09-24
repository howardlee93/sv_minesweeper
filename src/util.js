// util.js 

function click(cell){
    let current = cell.id;
    if (isGameOver) return;
    if (cell.classList.contains('checked') || cell.classList.contains( 'F')){
        return;
    }
    if (cell.classList.contains('B')){
        gameOver(cell);
    }else{
        let total = cell.getAttribute('data');
        if (total != 0){
            cell.classList.add('checked');
            cell.innerHTML = "<span>" +total +"</span>";
            return;
        }
        checkCell(cell, current);
    }
    cell.classList.add('checked');
};


function checkCell(cell, currentId){
    const left = (currentId % level === 0);
    const right = (currentId % level ===  level - 1);

    setTimeout(()=>{
        if (currentId > 0 && !left){
            const newId = cells[parseInt(currentId) -1].id;
            const newCell = document.getElementById(newId);
            click(newCell);
        }

        if (currentId > 9 && !right){
            const newId = cells[parseInt(currentId) +1 - level].id;
            const newCell = document.getElementById(newId);
            click(newCell);
        }

        if (currentId > 10){
            const newId = cells[parseInt(currentId)  - level].id;
            const newCell = document.getElementById(newId);
            click(newCell);
        }


        if (currentId > 11 && !left){
            const newId = cells[parseInt(currentId)  -1 - level].id;
            const newCell = document.getElementById(newId);
            click(newCell);
        }


        if (currentId < 99 && !right){
            const newId = cells[parseInt(currentId) +1].id;
            const newCell = document.getElementById(newId);
            click(newCell);
        }

        if (currentId < 90 && !left){
            const newId = cells[parseInt(currentId)  -1 +level].id;
            const newCell = document.getElementById(newId);
            click(newCell);
        }

        if (currentId < 88 && !right){
            const newId = cells[parseInt(currentId) +1 + level].id;
            const newCell = document.getElementById(newId);
            click(newCell);
        }

        if (currentId < 89){
            const newId = cells[parseInt(currentId) + level].id;
            const newCell = document.getElementById(newId);
            click(newCell);
        }

    },10)
}

function addFlag(cell){
    if (isGameOver) return;
    if (!cell.classList.contains('checked') && flags < bombAmount){
        if(!cell.classList.contains('F')){
            //add flag
            cell.classList.add('F');
            cell.innerHTML = '<span>F</span>';
            flags++;
            checkWin();
        }else{
            cell.classList.remove('F');
            cell.innerHTML = '';
            flags--;
        }
    }
};


function gameOver(){
    const status = document.getElementById('status');
    status.innerHTML = 'Game over';
    isGameOver = true;
    
    cells.forEach(cell =>{
        if (cell.classList.contains('B')){
            cell.innerHTML = 'B';
        }
    })
}

function checkWin(){
    let matches = 0;
    for (let i = 0; i < cells.length; i++){
        if (cells[i].classList.contains('F') && cells[i].classList.contains('B')) matches++;
    }
    if (matches === bombAmount){
        const status = document.getElementById('status');
        status.innerHTML = "You Won!";
        isGameOver = true;

    }
}

export {click, checkCell, checkWin, gameOver}

