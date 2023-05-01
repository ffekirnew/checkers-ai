import { generateNextPlaces } from "./main.js";

class MiniMax {
    // Computer is black, and human is white
    constructor() {

    }

    // TODO: implement function to suggest the best move
    getBestMove(board, maximizingPlayer, turn) {
        if (board.whiteScore == 0)
            return [null, null, null, 1];

        if (board.blackScore == 0)
            return [null, -1]

        if (maximizingPlayer)
            return this.maximize(board, 'black');

        return this.minimize(board, 'white');
    }

    // TODO: implement minimizer function
    minimize(board, turn) {
        let bestPiece;
        let bestRow;
        let bestCol;

        let minVal = Infinity;

        let whitePieces = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board.board[i][j] && board.board[i][j].color == 'white') {
                    whitePieces.push([board.board[i][j], i, j]);
                }
            }
        }

        for (let i = 0; i < whitePieces.length; i++) {
            const nextCells = generateNextPlaces(whitePieces[i][0], whitePieces[i][1], whitePieces[i][2]);

            for (let j = 0; j < nextCells.length; j++) {
                let new_board = { ...board };

                let from = { y: whitePieces[i][0], x: whitePieces[i][1] };
                let to = { y: nextCells[j][0], x: nextCells[j][1] };

                movePiece(new_board, from, to);

                let score = this.getBestMove(new_board, true, 'black')[3];
                if (score <= minVal) {
                    bestPiece = whitePieces[i][0];
                    bestRow = whitePieces[i][1];
                    bestCol = whitePieces[i][2];
                    minVal = score;
                }
            }

        }
        return [bestPiece, bestRow, bestCol, minVal];

    }

    // TODO: implement maximizer function
    maximize(board, turn) {
        let bestPiece;
        let bestRow;
        let bestCol;

        let maxVal = -Infinity;

        let blackPieces = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board.board[i][j] && board.board[i][j].color == 'black') {
                    blackPieces.push([board.board[i][j], i, j]);
                }
            }
        }

        for (let i = 0; i < blackPieces.length; i++) {
            const nextCells = generateNextPlaces(blackPieces[i][0], blackPieces[i][1], blackPieces[i][2]);


            for (let j = 0; j < nextCells.length; j++) {
                let new_board = { ...board };

                let from = { y: blackPieces[i][1], x: blackPieces[i][2] };
                let to = { y: nextCells[j][0], x: nextCells[j][1] };

                movePiece(new_board, from, to);

                let score = this.getBestMove(new_board, false, 'white')[3];
                if (score >= maxVal) {
                    bestPiece = blackPieces[i][0];
                    bestRow = blackPieces[i][1];
                    bestCol = blackPieces[i][2];
                    minVal = score;
                }
            }

        }
        return [bestPiece, bestRow, bestCol, minVal];

    }
}

function movePiece(board, from, to) {
    let distance = Math.abs(from.x - to.x);
    if (distance > 1) {
        board.board[(from.y + to.y) / 2][(from.x + to.x) / 2] = null;
    }
    board.board[to.y][to.x] = board.board[from.y][from.x];
    board.board[from.y][from.x].move(to); //  .movePiece(from, to);
    board.board[from.y][from.x] = null; //  .movePiece(from, to);

}

export default MiniMax;