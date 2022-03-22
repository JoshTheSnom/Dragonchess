import { Component } from '@angular/core';

class Tile {
  constructor(piece: string, canGo: boolean, color: string, pieceColor: string) {
    this.piece = piece;
    this.canGo = canGo;
    this.color = color;
    this.pieceColor = pieceColor;
  }
  piece:string;
  canGo:boolean;
  color:string;
  pieceColor:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Dragonchess';

  ranks:number = 8;
  files:number = 12;

  whosTurn = "gold";

  turns: String[];
  turnsindex = 0;

  boards: Tile[][][];

  board1: Tile[][];
  board2: Tile[][];
  board3: Tile[][];
  //boards[this.bnF]: Tile[][];

  constructor(){
    this.board1 = [];
    this.board2 = [];
    this.board3 = [];
    // @ts-ignore

    this.setBoards();

  }
  rowF:number;
  colF:number;
  bnF:number;
  bnS:number;

  onClick(col, row, bn){
    console.log(col, row);

    if(this.rowF == null) {
      this.bnF = bn;
      //this.slicebn(this.bnF);
    }

    if(this.rowF == null && this.boards[this.bnF][col][row].piece != "" && this.boards[this.bnF][col][row].pieceColor == this.whosTurn && !(this.boards[3][col][row].piece == "B" && this.bnF==2 && this.boards[this.bnF][col][row].pieceColor != this.boards[3][col][row].pieceColor)) {
      this.rowF = row;
      this.colF = col;
      //console.log(row, col)
      this.darkenColor(col, row, this.bnF)

      switch (this.boards[this.bnF][col][row].piece) {
        case 'U':
          this.knightMove(col, row);
          break;
        case 'O':
          this.rookMove(col, row);
          break;
        case 'H':
          if(this.bnF == 2) {
            this.markTile(col + 1, row + 1, this.bnF);
            this.markTile(col + 2, row + 2, this.bnF);
            this.markTile(col + 1, row - 1, this.bnF);
            this.markTile(col + 2, row - 2, this.bnF);
            this.markTile(col - 1, row + 1, this.bnF);
            this.markTile(col - 2, row + 2, this.bnF);
            this.markTile(col - 1, row - 1, this.bnF);
            this.markTile(col - 2, row - 2, this.bnF);
            this.markTile(col + 1, row + 1, 1);
            this.markTile(col - 1, row + 1, 1);
            this.markTile(col + 1, row - 1, 1);
            this.markTile(col - 1, row - 1, 1);
            this.markTile(col + 1, row + 1, 3);
            this.markTile(col - 1, row + 1, 3);
            this.markTile(col + 1, row - 1, 3);
            this.markTile(col - 1, row - 1, 3);
          }
          else {
            this.markTile(col + 1, row + 1, 2);
            this.markTile(col - 1, row + 1, 2);
            this.markTile(col + 1, row - 1, 2);
            this.markTile(col - 1, row - 1, 2);
          }
          break;
        case 'T':
          this.bishopMove(col, row);
          break;
        case 'C':
          this.kingMove(col, row);
          if(this.bnF == 2) {
            this.markTile(col, row, 1);
            this.markTile(col, row, 3);
          }
          else this.markTile(col, row, 2);
          break;
        case 'M':
          if(this.bnF == 2) {
            this.rookMove(col, row);
            this.bishopMove(col, row);
            this.markTile(col, row, 1);
            this.markTile(col, row, 3);
          }
          else {
            this.markTileMove(col+1, row, bn);
            this.markTileMove(col, row+1, bn);
            this.markTileMove(col-1, row, bn);
            this.markTileMove(col, row-1, bn);
            this.markTile(col, row, 2);
            if(this.boards[2][col][row].piece == '') {
              this.markTile(col, row, 1);
              this.markTile(col, row, 3);
            }
          }


          break;
        case 'K':
          if(this.bnF==2) {
            this.kingMove(col, row);
            this.markTile(col, row, 1);
            this.markTile(col, row, 3);
          }
          else this.markTileMove(col, row, 2);
          break;
        case 'P':
          this.kingMove(col, row);
          if(this.bnF==2) {
            this.knightMove(col, row);

            this.markTile(col+2, row, 1);
            this.markTile(col, row+2, 1);
            this.markTile(col-2, row, 1);
            this.markTile(col, row-2, 1);
            this.markTile(col+2, row, 3);
            this.markTile(col, row+2, 3);
            this.markTile(col-2, row, 3);
            this.markTile(col, row-2, 3);
          }
          else {
            this.markTile(col+2, row, 2);
            this.markTile(col, row+2, 2);
            this.markTile(col-2, row, 2);
            this.markTile(col, row-2, 2);
            if(this.bnF == 3) {
              this.markTile(col+1, row, 1);
              this.markTile(col, row+1, 1);
              this.markTile(col-1, row, 1);
              this.markTile(col, row-1, 1);
            }
            else {
              this.markTile(col+1, row, 3);
              this.markTile(col, row+1, 3);
              this.markTile(col-1, row, 3);
              this.markTile(col, row-1, 3);
            }
          }

          break;
        case 'W':
          this.markTileMove(col, row-1, this.bnF);
          this.markTileTake(col+1, row-1, this.bnF);
          this.markTileTake(col-1, row-1, this.bnF);
          break;
        case 'S':
          if(this.bnF==1) {
            if(this.boards[this.bnF][col][row-1].piece != "")this.markTile(col, row - 1, this.bnF);
            this.markTileMove(col + 1, row - 1, this.bnF);
            this.markTileMove(col - 1, row - 1, this.bnF);
            this.markTile(col, row, 2)
          }
          else {
            if (this.boards[1][col][row].piece == '') this.markTile(col, row, 1);
            let colMod;
            if(this.whosTurn == "gold") colMod = 0;
            else colMod = 1;
              this.markTileMove(0+colMod, 6, 1);
              this.markTileMove(2+colMod, 6, 1);
              this.markTileMove(4+colMod, 6, 1);
              this.markTileMove(6+colMod, 6, 1);
              this.markTileMove(8+colMod, 6, 1);
              this.markTileMove(10+colMod, 6, 1);

          }
          break;
        case 'G':
          if(this.bnF==1) {
            this.markTile(col+2, row+3, this.bnF);
            this.markTile(col+3, row+2, this.bnF);
            this.markTile(col+3, row-2, this.bnF);
            this.markTile(col-2, row+3, this.bnF);
            this.markTile(col-3, row+2, this.bnF);
            this.markTile(col+2, row-3, this.bnF);
            this.markTile(col-3, row-2, this.bnF);
            this.markTile(col-2, row-3, this.bnF);
            this.markTile(col+1, row+1, 2);
            this.markTile(col-1, row+1, 2);
            this.markTile(col+1, row-1, 2);
            this.markTile(col-1, row-1, 2);
          }
          else {
            this.markTile(col+1, row+1, 1);
            this.markTile(col-1, row+1, 1);
            this.markTile(col+1, row-1, 1);
            this.markTile(col-1, row-1, 1);
            this.markTile(col+1, row+1, this.bnF);
            this.markTile(col-1, row+1, this.bnF);
            this.markTile(col+1, row-1, this.bnF);
            this.markTile(col-1, row-1, this.bnF);
          }

          break;
        case 'R':
          this.bishopMove(col, row);
          this.kingMove(col, row);

          this.markTile(col + 1, row, 2);
          this.markTile(col, row + 1, 2);
          this.markTile(col - 1, row, 2);
          this.markTile(col, row - 1, 2);
          this.markTile(col, row, 2);

          break;
        case 'B':
          this.markTile(col, row - 1, this.bnF);
          this.markTile(col + 1, row - 1, this.bnF);
          this.markTile(col - 1, row - 1, this.bnF);
          this.markTileMove(col, row - 1, this.bnF);
          break;
        case 'E':
          if(this.bnF == 3) {
            this.markTileMove(col + 1, row + 1, this.bnF);
            this.markTileMove(col + 1, row - 1, this.bnF);
            this.markTileMove(col - 1, row + 1, this.bnF);
            this.markTileMove(col - 1, row - 1, this.bnF);
            this.markTile(col + 1, row, this.bnF);
            this.markTile(col, row + 1, this.bnF);
            this.markTile(col - 1, row, this.bnF);
            this.markTile(col, row - 1, this.bnF);
            this.markTile(col + 2, row, this.bnF);
            this.markTile(col, row + 2, this.bnF);
            this.markTile(col - 2, row, this.bnF);
            this.markTile(col, row - 2, this.bnF);
            this.markTile(col + 1, row, 2);
            this.markTile(col, row + 1, 2);
            this.markTile(col - 1, row, 2);
            this.markTile(col, row - 1, 2);
          }
          else {
            this.markTile(col + 1, row, 3);
            this.markTile(col, row + 1, 3);
            this.markTile(col - 1, row, 3);
            this.markTile(col, row - 1, 3);
          }
          break;
        case 'D':
          this.markTileMove(col, row-1, this.bnF);
          this.markTileMove(col+1, row, this.bnF);
          this.markTileMove(col-1, row, this.bnF);
          this.markTileTake(col+1, row-1, this.bnF);
          this.markTileTake(col-1, row-1, this.bnF);
          if(this.bnF==3) this.markTileTake(col, row, 2);
          else this.markTileMove(col, row, 3);
          break;
      }
    }

    else if (this.rowF == row && this.colF == col && this.bnF == bn) {
      this.clearBoardSelect();

    }
    else if (this.rowF != null && this.boards[bn][col][row].canGo){

      let turn: string = "";
      //TODO: check if multiple pieces of the same kind can move there
      turn += this.boards[this.bnF][this.colF][this.rowF].piece;
      if(this.boards[this.bnF][col][row].piece != '') turn += 'x';
      turn += '2' //for now only 2, change later
      if(this.whosTurn=="gold"){
        turn += String.fromCharCode(col+97);
        turn += (8-row).toString();
      }
      else {
        turn += String.fromCharCode(108-col);
        turn += (row+1).toString();
      }
      console.log(turn);


      if(this.boards[this.bnF][this.colF][this.rowF].piece == 'W' && row==0){//promote W to H
        this.boards[this.bnF][col][row].piece = 'H';
        this.boards[this.bnF][col][row].pieceColor = this.boards[this.bnF][this.colF][this.rowF].pieceColor;
        this.boards[this.bnF][this.colF][this.rowF].piece = "";
        this.boards[this.bnF][this.colF][this.rowF].pieceColor = "white";
      }
      else if(this.boards[this.bnF][this.colF][this.rowF].piece == 'R' && bn == 2) {
        this.boards[2][col][row].piece = '';
      }
      else {
        this.boards[bn][col][row].piece = this.boards[this.bnF][this.colF][this.rowF].piece;
        this.boards[bn][col][row].pieceColor = this.boards[this.bnF][this.colF][this.rowF].pieceColor;
        this.boards[this.bnF][this.colF][this.rowF].piece = "";
        this.boards[this.bnF][this.colF][this.rowF].pieceColor = "white";
        /*this.sliceBack(this.bnF);
        let dboards[this.bnF] = this.boards[this.bnF].slice(0);
        this.slicebn(bn);
        this.boards[this.bnF][col][row].piece = dboards[this.bnF][this.colF][this.rowF].piece;
        this.boards[this.bnF][col][row].pieceColor = dboards[this.bnF][this.colF][this.rowF].pieceColor;
        dboards[this.bnF][this.colF][this.rowF].piece = "";
        dboards[this.bnF][this.colF][this.rowF].pieceColor = "white";
        console.log(this.boards[this.bnF][col][row].piece);
        console.log(dboards[this.bnF][col][row].piece);
        this.boards[this.bnF] = dboards[this.bnF].slice(0);
        this.clearBoardSelect();
        this.sliceBack(bn);
        this.slicebn(this.bnF);*/
      }
      this.clearBoardSelect();
      if(this.whosTurn=="gold") this.whosTurn = "darkred";
      else this.whosTurn="gold";




      let y = this.files-1; //turning around
      for(let i = 0; i < this.files; i++) {
        var x = this.ranks-1;
        for(let j = 0; j < this.ranks/2; j++) {
          for(let b = 1; b <= 3; b++) {
            var board = this.boards[b][i][j];
            this.boards[b][i][j] = this.boards[b][y][x];
            this.boards[b][y][x] = board;
            console.log("Původní: "+ y, x +"; Otočené: "+ i, j)
          }
          x--;
        }
        y--;
      }

      //this.sliceBack(this.bnF)

    }
  }

  clearBoardSelect() {
    for(let i = 0; i < this.files; i++) {
      for (let j = 0; j < this.ranks; j++) {
        for(let b = 1; b <= 3; b++) {
          if (this.boards[b][i][j].color == "#ab8036") this.boards[b][i][j].color = "#d2ae71";
          else if (this.boards[b][i][j].color == "#006d00") this.boards[b][i][j].color = "#009d00";
          else if (this.boards[b][i][j].color == "#99170d") this.boards[b][i][j].color = "#db2213";
          else if (this.boards[b][i][j].color == "#633100") this.boards[b][i][j].color = "#8e4700";
          else if (this.boards[b][i][j].color == "#959595") this.boards[b][i][j].color = "#d6d6d6";
          else if (this.boards[b][i][j].color == "#007cf7") this.boards[b][i][j].color = "#62b1ff";

          this.boards[b][i][j].canGo = false;
        }
      }
    }
    this.rowF=this.colF = null;
    //this.sliceBack(this.bnF)
  }

  markTile(col, row, bn) {
    if(col>=0 && row >= 0 && col < this.files && row < this.ranks && this.boards[bn][col][row].pieceColor != this.boards[this.bnF][this.colF][this.rowF].pieceColor) {
      this.boards[bn][col][row].canGo = true;
      this.darkenColor(col, row, bn);
    }
  }

  markTileMove(col, row, bn) {
    if(col>=0 && row >= 0 && col < this.files && row < this.ranks && this.boards[bn][col][row].piece == "") {
      this.boards[bn][col][row].canGo = true;
      this.darkenColor(col, row, bn);
    }
  }

  markTileTake(col, row, bn) {
    if(col>=0 && row >= 0 && col < this.files && row < this.ranks && this.boards[bn][col][row].pieceColor != this.boards[this.bnF][this.colF][this.rowF].pieceColor && this.boards[bn][col][row].piece != "") {
      this.boards[bn][col][row].canGo = true;
      this.darkenColor(col, row, bn);
    }
  }

  darkenColor(col, row, bn) {
    if (this.boards[bn][col][row].color == "#d2ae71") this.boards[bn][col][row].color = "#ab8036";
    else if(this.boards[bn][col][row].color == "#009d00") this.boards[bn][col][row].color = "#006d00";
    else if(this.boards[bn][col][row].color == "#db2213")this.boards[bn][col][row].color = "#99170d";
    else if(this.boards[bn][col][row].color == "#8e4700")this.boards[bn][col][row].color = "#633100";
    else if(this.boards[bn][col][row].color == "#d6d6d6")this.boards[bn][col][row].color = "#959595";
    else if(this.boards[bn][col][row].color == "#62b1ff")this.boards[bn][col][row].color = "#007cf7";
  }

  setBoards() {
    this.boards = [];
    this.boards[3] = [];
    this.boards[2] = [];
    this.boards[1] = [];
    for (let y = 0; y < this.files; y++) {
      this.boards[3][y] = [];
      this.boards[2][y] = [];
      this.boards[1][y] = [];
      for (let x = 0; x < this.ranks; x++) { //initializing boards;
        //console.log(y + " " + x);
        if((x+y)%2 == 0)this.boards[3][y][x] = new Tile("",false, "#db2213", "white"); //underground board
        else this.boards[3][y][x] = new Tile("",false, "#8e4700", "white");
        if((x+y)%2 == 0)this.boards[2][y][x] = new Tile("",false, "#d2ae71", "white"); //earth board
        else this.boards[2][y][x] = new Tile("",false, "#009d00", "white");
        if((x+y)%2 == 0)this.boards[1][y][x] = new Tile("",false, "#d6d6d6", "white"); //sky board
        else this.boards[1][y][x] = new Tile("",false, "#62b1ff", "white");
      }
    }
    for (let i = 0; i < this.files; i++) {
      this.boards[2][i][1].piece = "W"
      this.boards[2][i][6].piece = "W"
    }

    this.boards[3][1][1].piece = "D";
    this.boards[3][3][1].piece = "D";
    this.boards[3][5][1].piece = "D";
    this.boards[3][7][1].piece = "D";
    this.boards[3][9][1].piece = "D";
    this.boards[3][11][1].piece = "D";
    this.boards[3][2][0].piece = "B";
    this.boards[3][6][0].piece = "E";
    this.boards[3][10][0].piece = "B";

    this.boards[3][1][6].piece = "D";
    this.boards[3][3][6].piece = "D";
    this.boards[3][5][6].piece = "D";
    this.boards[3][7][6].piece = "D";
    this.boards[3][9][6].piece = "D";
    this.boards[3][11][6].piece = "D";
    this.boards[3][2][7].piece = "B";
    this.boards[3][6][7].piece = "E";
    this.boards[3][10][7].piece = "B";


    this.boards[2][0][0].piece = "O";
    this.boards[2][1][0].piece = "U";
    this.boards[2][2][0].piece = "H";
    this.boards[2][3][0].piece = "T";
    this.boards[2][4][0].piece = "C";
    this.boards[2][5][0].piece = "M";
    this.boards[2][6][0].piece = "K";
    this.boards[2][7][0].piece = "P";
    this.boards[2][8][0].piece = "T";
    this.boards[2][9][0].piece = "H";
    this.boards[2][10][0].piece = "U";
    this.boards[2][11][0].piece = "O";

    this.boards[2][0][7].piece = "O";
    this.boards[2][1][7].piece = "U";
    this.boards[2][2][7].piece = "H";
    this.boards[2][3][7].piece = "T";
    this.boards[2][4][7].piece = "C";
    this.boards[2][5][7].piece = "M";
    this.boards[2][6][7].piece = "K";
    this.boards[2][7][7].piece = "P";
    this.boards[2][8][7].piece = "T";
    this.boards[2][9][7].piece = "H";
    this.boards[2][10][7].piece = "U";
    this.boards[2][11][7].piece = "O";


    this.boards[1][0][1].piece = "S";
    this.boards[1][2][1].piece = "S";
    this.boards[1][4][1].piece = "S";
    this.boards[1][6][1].piece = "S";
    this.boards[1][8][1].piece = "S";
    this.boards[1][10][1].piece = "S";
    this.boards[1][2][0].piece = "G";
    this.boards[1][6][0].piece = "R";
    this.boards[1][10][0].piece = "G";

    this.boards[1][0][6].piece = "S";
    this.boards[1][2][6].piece = "S";
    this.boards[1][4][6].piece = "S";
    this.boards[1][6][6].piece = "S";
    this.boards[1][8][6].piece = "S";
    this.boards[1][10][6].piece = "S";
    this.boards[1][2][7].piece = "G";
    this.boards[1][6][7].piece = "R";
    this.boards[1][10][7].piece = "G";


    for(let i = 0; i < this.files; i++) {
      for(let b = 1; b <= 3; b++) {
        if(this.boards[b][i][0].piece != '') this.boards[b][i][0].pieceColor = "darkred";
        if(this.boards[b][i][1].piece != '') this.boards[b][i][1].pieceColor = "darkred";
        if(this.boards[b][i][6].piece != '') this.boards[b][i][6].pieceColor = "gold";
        if(this.boards[b][i][7].piece != '') this.boards[b][i][7].pieceColor = "gold";
      }
    }
  }

  rookMove(col, row) {
    for(let i = col+1; i < this.files; i++){
      if(this.boards[this.bnF][i][row].pieceColor == this.boards[this.bnF][col][row].pieceColor) break;
      else {
        this.markTile(i, row, this.bnF);
        if(this.boards[this.bnF][i][row].piece != '') break;
      }
    }
    for(let i = col-1; i >= 0; i--) {
      if(this.boards[this.bnF][i][row].pieceColor == this.boards[this.bnF][col][row].pieceColor) break;
      else {
        this.markTile(i, row, this.bnF);
        if(this.boards[this.bnF][i][row].piece != '') break;
      }
    }
    for(let i = row+1; i < this.ranks; i++) {
      if(this.boards[this.bnF][col][i].pieceColor == this.boards[this.bnF][col][row].pieceColor) break;
      else {
        this.markTile(col, i, this.bnF);
        if(this.boards[this.bnF][col][i].piece != '') break;
      }
    }
    for(let i = row-1; i >= 0; i--) {
      if(this.boards[this.bnF][col][i].pieceColor == this.boards[this.bnF][col][row].pieceColor) break;
      else {
        this.markTile(col, i, this.bnF);
        if(this.boards[this.bnF][col][i].piece != '') break;
      }
    }
  }

  bishopMove(col, row) {
    for(let i = col+1, j = row + 1; i < this.files && j < this.ranks; i++, j++){
      if(this.boards[this.bnF][i][j].pieceColor == this.boards[this.bnF][col][row].pieceColor) break;
      else {
        this.markTile(i, j, this.bnF);
        if(this.boards[this.bnF][i][j].piece != '') break;
      }
    }
    for(let i = col-1, j = row - 1; i >= 0 && j >= 0; i--, j--) {
      if(this.boards[this.bnF][i][j].pieceColor == this.boards[this.bnF][col][row].pieceColor) break;
      else {
        this.markTile(i, j, this.bnF);
        if(this.boards[this.bnF][i][j].piece != '') break;
      }
    }
    for(let i = col+1, j = row - 1; i < this.files && j >= 0; i++, j--) {
      if(this.boards[this.bnF][i][j].pieceColor == this.boards[this.bnF][col][row].pieceColor) break;
      else {
        this.markTile(i, j, this.bnF);
        if(this.boards[this.bnF][i][j].piece != '') break;
      }
    }
    for(let i = col-1, j = row + 1; i >= 0 && j < this.ranks; i--, j++) {
      if(this.boards[this.bnF][i][j].pieceColor == this.boards[this.bnF][col][row].pieceColor) break;
      else {
        this.markTile(i, j, this.bnF);
        if(this.boards[this.bnF][i][j].piece != '') break;
      }
    }
  }

  knightMove(col, row) {
    this.markTile(col+1, row+2, this.bnF);
    this.markTile(col+2, row+1, this.bnF);
    this.markTile(col+2, row-1, this.bnF);
    this.markTile(col-1, row+2, this.bnF);
    this.markTile(col-2, row+1, this.bnF);
    this.markTile(col+1, row-2, this.bnF);
    this.markTile(col-2, row-1, this.bnF);
    this.markTile(col-1, row-2, this.bnF);
  }

  kingMove(col, row) {
    this.markTile(col+1, row+1, this.bnF);
    this.markTile(col+1, row-1, this.bnF);
    this.markTile(col-1, row+1, this.bnF);
    this.markTile(col-1, row-1, this.bnF);
    this.markTile(col+1, row, this.bnF);
    this.markTile(col, row+1, this.bnF);
    this.markTile(col-1, row, this.bnF);
    this.markTile(col, row-1, this.bnF);
  }
}
