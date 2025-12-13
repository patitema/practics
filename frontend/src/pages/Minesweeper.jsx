import React from 'react'
import { Board } from '../components/Minesweeper/Board'
import { useMinesweeper } from '../hooks/Minesweeper/useMinesweeper'
import '../assets/styles/Minesweeper.css'

export default function Minesweeper() {
    const {
        board,
        gameStatus,
        flagsCount,
        handleCellClick,
        handleRightClick,
        handleReset,
    } = useMinesweeper()

    const getStatusText = () => {
        switch (gameStatus) {
            case 'won':
                return 'Победа! 🎉'
            case 'lost':
                return 'Проигрыш! 💣'
            default:
                return 'Играем...'
        }
    }

    const getStatusClass = () => {
        switch (gameStatus) {
            case 'won':
                return 'game-status won'
            case 'lost':
                return 'game-status lost'
            default:
                return 'game-status'
        }
    }

    return (
        <div className="game-minesweeper">
            <div className="game-info">
                <div className={getStatusClass()}>{getStatusText()}</div>
                <div className="flags-counter">Флаги: {flagsCount} / 10</div>
                <button
                    className="reset-button-minesweeper"
                    onClick={handleReset}
                >
                    Новая игра
                </button>
            </div>

            <div className="game-board-container-minesweeper">
                <Board
                    board={board}
                    onCellClick={handleCellClick}
                    onRightClick={handleRightClick}
                />
            </div>
        </div>
    )
}
