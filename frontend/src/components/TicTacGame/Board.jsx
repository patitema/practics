import React from 'react'
import Square from './Square'

export function Board({ squares, xIsNext, onPlay }) {
    const renderSquare = (i) => (
        <Square key={i} value={squares[i]} onClick={() => onPlay(i)} />
    )

    const boardRows = [0, 1, 2].map((row) => (
        <div key={row} className="board-row">
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
    ))

    return (
        <>
            <div className="status">{xIsNext}</div>
            <div className="game-board">{boardRows}</div>
        </>
    )
}
