import React from 'react'
import Cell from './Cell'

export function Board({ board, onCellClick, onRightClick }) {
    const renderCell = (row, col) => (
        <Cell
            key={`${row}-${col}`}
            cell={board[row][col]}
            row={row}
            col={col}
            onClick={onCellClick}
            onRightClick={onRightClick}
        />
    )

    const boardRows = Array.from({ length: 9 }, (_, row) => (
        <div key={row} className="board-row">
            {Array.from({ length: 9 }, (_, col) => renderCell(row, col))}
        </div>
    ))

    return <div className="game-board">{boardRows}</div>
}
