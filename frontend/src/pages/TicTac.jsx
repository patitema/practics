import React from 'react'
import { Board } from '../components/TicTacGame/Board'
import { useTicTacGame } from '../hooks/TicTacGame/useTicTacGame'
import '../assets/styles/Tic-tac.css'

export default function Tic_tac() {
    const { squares, xIsNext, status, handleClick, handleReset } =
        useTicTacGame()

    return (
        <div className="game">
            <div className="game-board-container">
                <Board
                    squares={squares}
                    xIsNext={status}
                    onPlay={handleClick}
                />
            </div>
            <div className="game-info">
                <button className="reset-button" onClick={handleReset}>
                    Новая игра
                </button>
            </div>
        </div>
    )
}
