import { useState, useCallback } from 'react'

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Строки
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Столбцы
        [0, 4, 8],
        [2, 4, 6], // Диагонали
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a]
        }
    }
    return null
}

export function useTicTacGame() {
    const [currentSquares, setCurrentSquares] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)

    const handlePlay = useCallback((nextSquares) => {
        setCurrentSquares(nextSquares)
        setXIsNext((prev) => !prev)
    }, [])

    const handleReset = useCallback(() => {
        setCurrentSquares(Array(9).fill(null))
        setXIsNext(true)
    }, [])

    const handleClick = useCallback(
        (i) => {
            if (calculateWinner(currentSquares) || currentSquares[i]) {
                return
            }

            const nextSquares = currentSquares.slice()

            if (xIsNext) {
                nextSquares[i] = 'X'
            } else {
                nextSquares[i] = 'O'
            }
            handlePlay(nextSquares)
        },
        [currentSquares, xIsNext, handlePlay]
    )

    const winner = calculateWinner(currentSquares)
    const isDraw = !winner && currentSquares.every((sq) => sq !== null)

    let status
    if (winner) {
        status = `Победа: ${winner}`
    } else if (isDraw) {
        status = 'Ничья'
    } else {
        status = `Ход: ${xIsNext ? 'X' : 'O'}`
    }

    return {
        squares: currentSquares,
        xIsNext,
        status,
        handleClick,
        handleReset,
    }
}
