import { Component } from '@angular/core';

class Tile {
  constructor(piece: string, canGo: boolean, color: string, pieceColor: string) {
    this.piece = piece;
    this.canGo = canGo;
    this.color = color;
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

  board1: Tile[][];
  board2: Tile[][];
  board3: Tile[][];
  dupBoard: Tile[][];

  constructor(){
    this.board1 = [];
    this.board2 = [];
    this.board3 = [];
    // @ts-ignore

    this.setBoards();

  }
  rowF:number;
  colF:number;
  bnG:number;

  onClick(col, row, bn){
    console.log(col, row, bn);

    if(this.rowF == null) {
      this.bnG = bn;
      this.slicebn(this.bnG);
    }

    if(this.rowF == null && this.dupBoard[col][row].piece != "" && this.dupBoard[col][row].pieceColor == this.whosTurn) {
      this.rowF = row;
      this.colF = col;
      //console.log(row, col)
      this.darkenColor(col, row)

      switch (this.dupBoard[col][row].piece) {
        case 'U':
          this.markTile(col+1, row+2);
          this.markTile(col+2, row+1);
          this.markTile(col+2, row-1);
          this.markTile(col-1, row+2);
          this.markTile(col-2, row+1);
          this.markTile(col+1, row-2);
          this.markTile(col-2, row-1);
          this.markTile(col-1, row-2);
          break;
        case 'O':
          for(let i = col+1; i < this.files; i++){
            if(this.dupBoard[i][row].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(i, row);
              if(this.dupBoard[i][row].piece != '') break;
            }
          }
          for(let i = col-1; i >= 0; i--) {
            if(this.dupBoard[i][row].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(i, row);
              if(this.dupBoard[i][row].piece != '') break;
            }
          }
          for(let i = row+1; i < this.ranks; i++) {
            if(this.dupBoard[col][i].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(col, i);
              if(this.dupBoard[col][i].piece != '') break;
            }
          }
          for(let i = row-1; i >= 0; i--) {
            if(this.dupBoard[col][i].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(col, i);
              if(this.dupBoard[col][i].piece != '') break;
            }
          }
          break;
        case 'H':
          this.markTile(col+1, row+1);
          this.markTile(col+2, row+2);
          this.markTile(col+1, row-1);
          this.markTile(col+2, row-2);
          this.markTile(col-1, row+1);
          this.markTile(col-2, row+2);
          this.markTile(col-1, row-1);
          this.markTile(col-2, row-2);
          break;
        case 'T':
          for(let i = col+1, j = row + 1; i < this.files && j < this.ranks; i++, j++){
            if(this.dupBoard[i][j].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(i, j);
              if(this.dupBoard[i][j].piece != '') break;
            }
          }
          for(let i = col-1, j = row - 1; i >= 0 && j >= 0; i--, j--) {
            if(this.dupBoard[i][j].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(i, j);
              if(this.dupBoard[i][j].piece != '') break;
            }
          }
          for(let i = col+1, j = row - 1; i < this.files && j >= 0; i++, j--) {
            if(this.dupBoard[i][j].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(i, j);
              if(this.dupBoard[i][j].piece != '') break;
            }
          }
          for(let i = col-1, j = row + 1; i >= 0 && j < this.ranks; i--, j++) {
            if(this.dupBoard[i][j].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(i, j);
              if(this.dupBoard[i][j].piece != '') break;
            }
          }
          break;
        case 'C':
          this.markTile(col+1, row+1);
          this.markTile(col+1, row-1);
          this.markTile(col-1, row+1);
          this.markTile(col-1, row-1);
          this.markTile(col+1, row);
          this.markTile(col, row+1);
          this.markTile(col-1, row);
          this.markTile(col, row-1);
          break;
        case 'M':
          for(let i = col+1, j = row + 1; i < this.files && j < this.ranks; i++, j++){
            if(this.dupBoard[i][j].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(i, j);
              if(this.dupBoard[i][j].piece != '') break;
            }
          }
          for(let i = col-1, j = row - 1; i >= 0 && j >= 0; i--, j--) {
            if(this.dupBoard[i][j].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(i, j);
              if(this.dupBoard[i][j].piece != '') break;
            }
          }
          for(let i = col+1, j = row - 1; i < this.files && j >= 0; i++, j--) {
            if(this.dupBoard[i][j].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(i, j);
              if(this.dupBoard[i][j].piece != '') break;
            }
          }
          for(let i = col-1, j = row + 1; i >= 0 && j < this.ranks; i--, j++) {
            if(this.dupBoard[i][j].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(i, j);
              if(this.dupBoard[i][j].piece != '') break;
            }
          }
          for(let i = col+1; i < this.files; i++){
            if(this.dupBoard[i][row].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(i, row);
              if(this.dupBoard[i][row].piece != '') break;
            }
          }
          for(let i = col-1; i >= 0; i--) {
            if(this.dupBoard[i][row].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(i, row);
              if(this.dupBoard[i][row].piece != '') break;
            }
          }
          for(let i = row+1; i < this.ranks; i++) {
            if(this.dupBoard[col][i].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(col, i);
              if(this.dupBoard[col][i].piece != '') break;
            }
          }
          for(let i = row-1; i >= 0; i--) {
            if(this.dupBoard[col][i].pieceColor == this.dupBoard[col][row].pieceColor) break;
            else {
              this.markTile(col, i);
              if(this.dupBoard[col][i].piece != '') break;
            }
          }
          break;
        case 'K':
          this.markTile(col+1, row+1);
          this.markTile(col+1, row-1);
          this.markTile(col-1, row+1);
          this.markTile(col-1, row-1);
          this.markTile(col+1, row);
          this.markTile(col, row+1);
          this.markTile(col-1, row);
          this.markTile(col, row-1);
          break;
        case 'P':
          this.markTile(col+1, row+1);
          this.markTile(col+1, row-1);
          this.markTile(col-1, row+1);
          this.markTile(col-1, row-1);
          this.markTile(col+1, row);
          this.markTile(col, row+1);
          this.markTile(col-1, row);
          this.markTile(col, row-1);
          this.markTile(col+1, row+2);
          this.markTile(col+2, row+1);
          this.markTile(col+2, row-1);
          this.markTile(col-1, row+2);
          this.markTile(col-2, row+1);
          this.markTile(col+1, row-2);
          this.markTile(col-2, row-1);
          this.markTile(col-1, row-2);
          break;
        case 'W':
          if(this.dupBoard[col][row-1].piece=='')this.markTile(col, row-1);
          if(this.dupBoard[col+1][row-1].piece!='')this.markTile(col+1, row-1);
          if(this.dupBoard[col-1][row-1].piece!='')this.markTile(col-1, row-1);
          break;
        case 'S':
          if(this.dupBoard[col][row-1].piece!='')this.markTile(col, row-1);
          if(this.dupBoard[col+1][row-1].piece=='')this.markTile(col+1, row-1);
          if(this.dupBoard[col-1][row-1].piece=='')this.markTile(col-1, row-1);
          if(this.dupBoard[col][row].pieceColor != this.board2[this.colF][this.rowF].pieceColor) {
            this.board2[col][row].canGo = true;
            if (this.board2[col][row].color == "#d2ae71") this.board2[col][row].color = "#ab8036";
            else if (this.board2[col][row].color == "#009d00") this.board2[col][row].color = "#006d00";
          }
          break;
      }
    }

    else if (this.rowF == row && this.colF == col) {
      this.clearBoardSelect();

    }
    else if (this.rowF != null && this.dupBoard[col][row].canGo){

      let turn: string = "";
      //TODO: check if multiple pieces of the same kind can move there
      turn += this.dupBoard[this.colF][this.rowF].piece;
      if(this.dupBoard[col][row].piece != '') turn += 'x';
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


      if(this.dupBoard[this.colF][this.rowF].piece == 'W' && row==0) this.dupBoard[col][row].piece = 'H'; //promote W to H
      else {
        this.dupBoard[col][row].piece = this.dupBoard[this.colF][this.rowF].piece;
        this.dupBoard[col][row].pieceColor = this.dupBoard[this.colF][this.rowF].pieceColor;
        this.dupBoard[this.colF][this.rowF].piece = "";
        this.dupBoard[this.colF][this.rowF].pieceColor = "white";
        /*this.sliceBack(this.bnG);
        let ddupBoard = this.dupBoard.slice(0);
        this.slicebn(bn);
        this.dupBoard[col][row].piece = ddupBoard[this.colF][this.rowF].piece;
        this.dupBoard[col][row].pieceColor = ddupBoard[this.colF][this.rowF].pieceColor;
        ddupBoard[this.colF][this.rowF].piece = "";
        ddupBoard[this.colF][this.rowF].pieceColor = "white";
        console.log(this.dupBoard[col][row].piece);
        console.log(ddupBoard[col][row].piece);
        this.dupBoard = ddupBoard.slice(0);
        this.clearBoardSelect();
        this.sliceBack(bn);
        this.slicebn(this.bnG);*/
      }
      this.clearBoardSelect();
      if(this.whosTurn=="gold") this.whosTurn = "darkred";
      else this.whosTurn="gold";




      let y = 0; //turning around
      for(let i = this.files-1; i >= 0; i--) {
        var x = 0;
        for(let j = this.ranks-1; j >= this.ranks/2; j--) {

          var b1 = this.board1[i][j];
          var b2 = this.board2[i][j];
          var b3 = this.board3[i][j];
          this.board1[i][j] = this.board1[y][x];
          this.board2[i][j] = this.board2[y][x];
          this.board3[i][j] = this.board3[y][x];
          this.board1[y][x] = b1;
          this.board2[y][x] = b2;
          this.board3[y][x] = b3;
          x++;
        }
        y++;
      }

      this.sliceBack(this.bnG)

    }
  }

  clearBoardSelect() {
    for(let i = 0; i < this.files; i++) {
      for (let j = 0; j < this.ranks; j++) {
        if (this.dupBoard[i][j].color == "#ab8036") this.dupBoard[i][j].color = "#d2ae71";
        else if (this.dupBoard[i][j].color == "#006d00") this.dupBoard[i][j].color = "#009d00";
        else if(this.dupBoard[i][j].color == "#99170d")this.dupBoard[i][j].color = "#db2213";
        else if(this.dupBoard[i][j].color == "#633100")this.dupBoard[i][j].color = "#8e4700";
        else if(this.dupBoard[i][j].color == "#959595")this.dupBoard[i][j].color = "#d6d6d6";
        else if(this.dupBoard[i][j].color == "#007cf7")this.dupBoard[i][j].color = "#62b1ff";

        this.dupBoard[i][j].canGo = false;
      }
    }
    this.rowF=this.colF = null;
    this.sliceBack(this.bnG)
  }

  markTile(col, row) {
    if(col>=0 && row >= 0 && col < this.files && row < this.ranks && this.dupBoard[col][row].pieceColor != this.dupBoard[this.colF][this.rowF].pieceColor) {
      this.dupBoard[col][row].canGo = true;
      this.darkenColor(col, row);

    }
    //this.sliceBack(this.bnG)
  }

  darkenColor(col, row) {
    if (this.dupBoard[col][row].color == "#d2ae71") this.dupBoard[col][row].color = "#ab8036";
    else if (this.dupBoard[col][row].color == "#009d00") this.dupBoard[col][row].color = "#006d00";
    else if(this.dupBoard[col][row].color == "#db2213")this.dupBoard[col][row].color = "#99170d";
    else if(this.dupBoard[col][row].color == "#8e4700")this.dupBoard[col][row].color = "#633100";
    else if(this.dupBoard[col][row].color == "#d6d6d6")this.dupBoard[col][row].color = "#959595";
    else if(this.dupBoard[col][row].color == "#62b1ff")this.dupBoard[col][row].color = "#007cf7";
  }

  slicebn(bn) {
    if(bn == 1) this.dupBoard = this.board1.slice(0);
    else if (bn == 2) this.dupBoard = this.board2.slice(0);
    else this.dupBoard = this.board3.slice(0);
  }

  sliceBack(bn) {
    if(bn == 1) this.board1 = this.dupBoard.slice(0);
    else if (bn == 2) this.board2 = this.dupBoard.slice(0);
    else this.board3 = this.dupBoard.slice(0);
  }

  setBoards() {
    for (let y = 0; y < this.files; y++) {
      this.board1[y] = [];
      this.board2[y] = [];
      this.board3[y] = [];
      for (let x = 0; x < this.ranks; x++) { //initializing boards;
        //console.log(y + " " + x);
        if((x+y)%2 == 0)this.board1[y][x] = new Tile("",false, "#db2213", "white"); //underground board
        else this.board1[y][x] = new Tile("",false, "#8e4700", "white");
        if((x+y)%2 == 0)this.board2[y][x] = new Tile("",false, "#d2ae71", "white"); //earth board
        else this.board2[y][x] = new Tile("",false, "#009d00", "white");
        if((x+y)%2 == 0)this.board3[y][x] = new Tile("",false, "#d6d6d6", "white"); //sky board
        else this.board3[y][x] = new Tile("",false, "#62b1ff", "white");
      }
    }
    for (let i = 0; i < this.files; i++) {
      this.board2[i][1].piece = "W"
      this.board2[i][6].piece = "W"
    }

    this.board1[1][1].piece = "D";
    this.board1[3][1].piece = "D";
    this.board1[5][1].piece = "D";
    this.board1[7][1].piece = "D";
    this.board1[9][1].piece = "D";
    this.board1[11][1].piece = "D";
    this.board1[2][0].piece = "B";
    this.board1[6][0].piece = "E";
    this.board1[10][0].piece = "B";

    this.board1[1][6].piece = "D";
    this.board1[3][6].piece = "D";
    this.board1[5][6].piece = "D";
    this.board1[7][6].piece = "D";
    this.board1[9][6].piece = "D";
    this.board1[11][6].piece = "D";
    this.board1[2][7].piece = "B";
    this.board1[6][7].piece = "E";
    this.board1[10][7].piece = "B";


    this.board2[0][0].piece = "O";
    this.board2[1][0].piece = "U";
    this.board2[2][0].piece = "H";
    this.board2[3][0].piece = "T";
    this.board2[4][0].piece = "C";
    this.board2[5][0].piece = "M";
    this.board2[6][0].piece = "K";
    this.board2[7][0].piece = "P";
    this.board2[8][0].piece = "T";
    this.board2[9][0].piece = "H";
    this.board2[10][0].piece = "U";
    this.board2[11][0].piece = "O";

    this.board2[0][7].piece = "O";
    this.board2[1][7].piece = "U";
    this.board2[2][7].piece = "H";
    this.board2[3][7].piece = "T";
    this.board2[4][7].piece = "C";
    this.board2[5][7].piece = "M";
    this.board2[6][7].piece = "K";
    this.board2[7][7].piece = "P";
    this.board2[8][7].piece = "T";
    this.board2[9][7].piece = "H";
    this.board2[10][7].piece = "U";
    this.board2[11][7].piece = "O";


    this.board3[0][1].piece = "S";
    this.board3[2][1].piece = "S";
    this.board3[4][1].piece = "S";
    this.board3[6][1].piece = "S";
    this.board3[8][1].piece = "S";
    this.board3[10][1].piece = "S";
    this.board3[2][0].piece = "G";
    this.board3[6][0].piece = "R";
    this.board3[10][0].piece = "G";

    this.board3[0][6].piece = "S";
    this.board3[2][6].piece = "S";
    this.board3[4][6].piece = "S";
    this.board3[6][6].piece = "S";
    this.board3[8][6].piece = "S";
    this.board3[10][6].piece = "S";
    this.board3[2][7].piece = "G";
    this.board3[6][7].piece = "R";
    this.board3[10][7].piece = "G";


    for(let i = 0; i < this.files; i++) {
      if(this.board1[i][0].piece != '') this.board1[i][0].pieceColor = "darkred";
      if(this.board1[i][1].piece != '') this.board1[i][1].pieceColor = "darkred";
      if(this.board1[i][6].piece != '') this.board1[i][6].pieceColor = "gold";
      if(this.board1[i][7].piece != '') this.board1[i][7].pieceColor = "gold";
      if(this.board2[i][0].piece != '') this.board2[i][0].pieceColor = "darkred";
      if(this.board2[i][1].piece != '') this.board2[i][1].pieceColor = "darkred";
      if(this.board2[i][6].piece != '') this.board2[i][6].pieceColor = "gold";
      if(this.board2[i][7].piece != '') this.board2[i][7].pieceColor = "gold";
      if(this.board3[i][0].piece != '') this.board3[i][0].pieceColor = "darkred";
      if(this.board3[i][1].piece != '') this.board3[i][1].pieceColor = "darkred";
      if(this.board3[i][6].piece != '') this.board3[i][6].pieceColor = "gold";
      if(this.board3[i][7].piece != '') this.board3[i][7].pieceColor = "gold";
    }
  }
}
