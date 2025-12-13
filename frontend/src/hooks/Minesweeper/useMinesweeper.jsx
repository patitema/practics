import { useState, useCallback, useEffect } from 'react'

const ROWS = 9
const COLS = 9
const MINES = 10

function createEmptyBoard() {
    return Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
        }))
    )
}

function placeMines(board, firstClickRow, firstClickCol) {
    let minesPlaced = 0
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })))

    while (minesPlaced < MINES) {
        const row = Math.floor(Math.random() * ROWS)
        const col = Math.floor(Math.random() * COLS)

        if (
            (row === firstClickRow && col === firstClickCol) ||
            newBoard[row][col].isMine
        ) {
            continue
        }

        newBoard[row][col].isMine = true
        minesPlaced++
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (newBoard[row][col].isMine) {
                newBoard[row][col].adjacentMines = -1
            } else {
                let count = 0
                for (
                    let r = Math.max(0, row - 1);
                    r <= Math.min(ROWS - 1, row + 1);
                    r++
                ) {
                    for (
                        let c = Math.max(0, col - 1);
                        c <= Math.min(COLS - 1, col + 1);
                        c++
                    ) {
                        if (newBoard[r][c].isMine) count++
                    }
                }
                newBoard[row][col].adjacentMines = count
            }
        }
    }

    return newBoard
}

function revealCell(board, row, col) {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return board

    const newBoard = board.map((rowArr) => rowArr.map((cell) => ({ ...cell })))
    const cell = newBoard[row][col]

    if (cell.isRevealed || cell.isFlagged) return board

    cell.isRevealed = true

    return newBoard
}

function checkWin(board) {
    let unrevealedSafeCells = 0
    let revealedMines = 0

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = board[row][col]
            if (cell.isMine && cell.isRevealed) {
                revealedMines++
            } else if (!cell.isMine && !cell.isRevealed) {
                unrevealedSafeCells++
            }
        }
    }

    if (revealedMines > 0) return 'lose'
    if (unrevealedSafeCells === 0) return 'win'
    return null
}

export function useMinesweeper() {
    const [board, setBoard] = useState(createEmptyBoard())
    const [gameStatus, setGameStatus] = useState('playing')
    const [firstClick, setFirstClick] = useState(true)
    const [flagsCount, setFlagsCount] = useState(0)

    const handleCellClick = useCallback(
        (row, col) => {
            if (gameStatus !== 'playing') return

            const cell = board[row][col]
            if (cell.isRevealed || cell.isFlagged) return

            if (firstClick) {
                const boardWithMines = placeMines(board, row, col)
                setBoard(boardWithMines)
                setFirstClick(false)

                const revealedBoard = revealCell(boardWithMines, row, col)
                setBoard(revealedBoard)

                const result = checkWin(revealedBoard)
                if (result) {
                    setGameStatus(result === 'win' ? 'won' : 'lost')
                }
                return
            }

            const newBoard = revealCell(board, row, col)
            setBoard(newBoard)

            const result = checkWin(newBoard)
            if (result) {
                setGameStatus(result === 'win' ? 'won' : 'lost')
            }
        },
        [board, gameStatus, firstClick]
    )

    const handleRightClick = useCallback(
        (row, col, e) => {
            e.preventDefault()
            if (gameStatus !== 'playing') return

            const newBoard = board.map((rowArr) =>
                rowArr.map((cell) => ({ ...cell }))
            )
            const cell = newBoard[row][col]

            if (cell.isRevealed) return

            cell.isFlagged = !cell.isFlagged
            setBoard(newBoard)

            const newFlagsCount = flagsCount + (cell.isFlagged ? 1 : -1)
            setFlagsCount(newFlagsCount)
        },
        [board, gameStatus, flagsCount]
    )

    const handleReset = useCallback(() => {
        setBoard(createEmptyBoard())
        setGameStatus('playing')
        setFirstClick(true)
        setFlagsCount(0)
    }, [])

    return {
        board,
        gameStatus,
        flagsCount,
        handleCellClick,
        handleRightClick,
        handleReset,
    }
}
