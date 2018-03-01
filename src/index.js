module.exports = function solveSudoku(matrix) {

    var solved=[];
    var suggest = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var i, j;

    for(i = 0; i < 9; i++){
        solved[i] = [];
        for(j = 0; j < 9; j++){
            if(matrix[i][j]){
                solved[i][j] = matrix[i][j];
            } else {
                solved[i][j] = suggest.concat();
            }
        }
    }

    solution(solved);
    return solved;
}

function solution(solved){ 

    var changed=0;
    var arr = [];
    var f;

    for (i = 0; i < 9; i++){
        arr = [];
        for(j = 0; j < 9; j++){
            if (solved[i][j].length == undefined){
                arr.push(solved[i][j]);
            }
        }

        for(j = 0; j < 9; j++){
            if (solved[i][j].length != undefined){
                for(f = 0; f < arr.length; f++){      
                    if(solved[i][j].indexOf(arr[f]) >= 0){
                        solved[i][j].splice(solved[i][j].indexOf(arr[f]),1);          
                    }
                }      
            }
        }

        for(j = 0; j < 9; j++){
            if (solved[i][j].length == 1){
                solved[i][j] = solved[i][j][0];
                changed++;
            }
        }
    }
  

    for (j = 0; j < 9; j++){
        arr = [];
        for( i = 0; i < 9; i++){
            if (solved[i][j].length == undefined){
                arr.push(solved[i][j]);
            }
        }


        for(i = 0; i < 9; i++){
            if (solved[i][j].length != undefined){
                for(f = 0; f < arr.length; f++){      
                    if(solved[i][j].indexOf(arr[f]) >= 0){
                        solved[i][j].splice(solved[i][j].indexOf(arr[f]),1); 
                    }
                } 
            }
        }
  
        for(i = 0; i < 9; i++){
            if (solved[i][j].length == 1){
                solved[i][j] = solved[i][j][0];
                changed++;
            }
        } 
    }

    var oi = 0;
    var oj=0;
    var counter = 0;

    cvadrats();

    function cvadrats(){
 
        arr = [];
        for (i = oi; i < oi+3; i++){ 
            for(j = oj; j < oj+3; j++){
                if (solved[i][j].length == undefined){
                    arr.push(solved[i][j]);
                }
            }       
        }

        for (i = oi; i < oi+3; i++){
            for(j = oj; j < oj+3; j++){
                if (solved[i][j].length != undefined){
                    for(f = 0; f < arr.length; f++){       
                        if(solved[i][j].indexOf(arr[f]) >= 0){
                            solved[i][j].splice(solved[i][j].indexOf(arr[f]),1);         
                        }
                    }
                }
            }
        }
  
        for (i = oi; i < oi+3; i++){
            for(j = oj; j < oj+3; j++){
                if (solved[i][j].length == 1){
                    solved[i][j] = solved[i][j][0];
                    changed++;
                }
            }
        }
  
        counter+=1;
        if(counter < 3){
            oj+=3;
            cvadrats();
        } else if (counter == 3 && oi < 6){
            oj = 0;
            oi += 3;
            counter = 0;
            cvadrats();
        }
    }

    counter = 0;
    for (i = 0; i < 9; i++){  
        for(j = 0; j < 9; j++){
            if(solved[i][j].length == 1){
                solved[i][j] = solved[i][j][0];
                changed++;
            } else if (solved[i][j].length != undefined){
                counter++;
            }
        }
    }

    oi = 0;
    oj=0;
    counter = 0;
    var kol = 0;

    lastInSquare(solved);

    function lastInSquare(solved){

        arr = [];
        options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (i = oi; i < oi+3; i++){
            for(j = oj; j < oj+3; j++){
                if (solved[i][j].length == undefined){     
                    options.splice(options.indexOf(solved[i][j]),1);
                } else {         
                    arr = arr.concat(solved[i][j]);
                }
            }
        }

        for(var k = 0; k < options.length; k++){
            kol = 0;
            for (var n = 0; n < arr.length; n++){
                if(options[k] == arr[n]){
                    kol+=1;
                } 
            }
            if(kol > 1){
                options.splice(options.indexOf(options[k]),1);
                k--;
            }
        }

        if (options.length > 0) {
            for (i = oi; i < oi+3; i++){
                for(j = oj; j < oj+3; j++){
                    if(solved[i][j].length != undefined){
                        for (f = 0; f< options.length; f++ ){
                            if(solved[i][j].indexOf(options[f]) >= 0){
                                solved[i][j] = options[f];
                                changed++;
                                f =  options.length;
                            }
                        }     
                    }
                }
            }
        }

        counter+=1;
        if(counter < 3){
            oj+=3;
            lastInSquare(solved);
        } else if(counter == 3 && oi < 6){
            oj = 0;
            oi += 3;
            counter = 0;
            lastInSquare(solved);
        }
        return solved;
    }

    lastInLine(solved);

    function lastInLine(solved){ 

        for (i = 0; i < 9; i++){
            arr = [];
            options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for(j = 0; j < 9; j++){
                if (solved[i][j].length == undefined){     
                    options.splice(options.indexOf(solved[i][j]),1);
                } else {        
                    arr = arr.concat(solved[i][j]);
                }
            }

            for(k = 0; k < options.length; k++){
                kol = 0;
                for (n = 0; n < arr.length; n++){
                    if(options[k] == arr[n]){
                        kol+=1;
                    } 
                }
                if(kol > 1){
                    options.splice(options.indexOf(options[k]),1);
                    k--;
                }
            }

            if (options.length > 0) {
                for(k = 0; k < 9; k++){
                    if (solved[i][k].length != undefined){
                        for (f = 0; f < options.length; f++){
                            if(solved[i][k].indexOf(options[f]) >= 0){
                                solved[i][k] = options[f];
                                changed++;
                                f =  options.length;
                            }
                        }      
                    }
                }
            }
        }
    }

    counter = 0;
    for(i = 0; i < 9; i++){  
        for(j = 0; j < 9; j++){
            if(solved[i][j].length == 1){
                solved[i][j] = solved[i][j][0];
                changed++;
            } else if(solved[i][j].length != undefined){
                counter++;
            }
        }
    }

    if(!counter){
        correct(solved);
    } else if(changed != 0){
        solution(solved);
    } else if(changed == 0){
        check(solved);
    }
}

function check(solved){

    counter = 0;
    var isSolved;
    for (i = 0; i < 9; i++){
        for(j = 0; j < 9; j++){
            if(solved[i][j].length != undefined){
                counter++ ;
            }
        }
    }

    if(counter){
        isSolved = false;
    }

    if(!isSolved){
        for (i = 0; i < 9; i++){
            for(j = 0; j < 9; j++){
                if (solved[i][j].length != undefined){
                    solved[i][j] = solved[i][j][0];
                    i=9;
                    j=9;
                }
            }
        }
        solution(solved);
    } 
}

function correct(solved){

    var isCorrect = true;
    var ok = [];
    for (i = 0; i < 9; i++){
        ok = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for(j = 0; j < 9; j++){
            if(ok.indexOf(solved[i][j]) >= 0){
                ok.splice(ok.indexOf(solved[i][j]),1);           
            }
            if(solved[i][j].length != undefined){
                isCorrect = false;
            } 
        }
        if (ok.length > 0){
            isCorrect = false;
        }       
    }

    for (j = 0; j < 9; j++){
        ok = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for(i = 0; i < 9; i++){
            if(ok.indexOf(solved[i][j]) >= 0){
                ok.splice(ok.indexOf(solved[i][j]),1);           
            }
        }
        if(ok.length > 0){
            isCorrect = false;
        }
    }

    oi=0;
    oj=0;
    counter = 0;
    checkBlocks();

    function checkBlocks(){

        ok = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for(i = oi; i < oi+3; i++){
            for(j = oj; j < oj+3; j++){
                ok.splice(ok.indexOf(solved[i][j]),1);
            }
        }

        if(ok.length > 0){
            isCorrect = false;
        }
       
        counter+=1;
        if(counter < 3){
            oj+=3;
            checkBlocks();
        } else if(counter == 3 && oi < 6){
            oj = 0;
            oi+=3;
            counter = 0;
            checkBlocks();
        }
    }

    if(isCorrect){
        return solved;
    }
}
