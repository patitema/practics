import React from 'react'

export default function Square({ value, onClick }) {
    const color = value === 'X' ? '#d9534f' : value === 'O' ? '#5cb85c' : '#333'

    return (
        <button className="square" onClick={onClick} style={{ color }}>
            {value}
        </button>
    )
}
