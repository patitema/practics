import React from 'react'

export default function Cell({ cell, row, col, onClick, onRightClick }) {
    const getCellContent = () => {
        if (cell.isFlagged) {
            return '🚩'
        }
        if (!cell.isRevealed) {
            return ''
        }
        if (cell.isMine) {
            return '💣'
        }
        return cell.adjacentMines > 0 ? cell.adjacentMines : ''
    }

    const getCellClass = () => {
        let className = 'cell'

        if (cell.isRevealed) {
            className += ' revealed'
            if (cell.isMine) {
                className += ' mine'
            }
        } else {
            className += ' hidden'
        }

        return className
    }

    const getCellColor = () => {
        if (!cell.isRevealed || cell.isMine || cell.isFlagged) {
            return '#333'
        }

        // Colors for numbers
        switch (cell.adjacentMines) {
            case 1:
                return '#1e90ff'
            case 2:
                return '#228b22'
            case 3:
                return '#d9534f'
            case 4:
                return '#4b0082'
            case 5:
                return '#8b4513'
            case 6:
                return '#00ced1'
            case 7:
                return '#000'
            case 8:
                return '#696969'
            default:
                return '#333'
        }
    }

    return (
        <button
            className={getCellClass()}
            onClick={() => onClick(row, col)}
            onContextMenu={(e) => onRightClick(row, col, e)}
            disabled={cell.isRevealed}
            style={{
                color: getCellColor(),
                fontWeight: cell.adjacentMines > 0 ? 'bold' : 'normal',
            }}
        >
            {getCellContent()}
        </button>
    )
}
