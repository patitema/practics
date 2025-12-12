import React from 'react'
import { Link } from 'react-router-dom'

export default function backButton() {
    return (
        <>
            <Link to="/">
                <button className="back-btn">
                    <img src="/images/back-arrow.png" alt="Назад" />
                </button>
            </Link>
        </>
    )
}
