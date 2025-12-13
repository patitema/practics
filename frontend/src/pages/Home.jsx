import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/Home.css'

export default function Home() {
    return (
        <div className="page-wrapper">
            <div className="main-container">
                <h1>Проекты на React</h1>
                <nav className="list-projects">
                    <Link to="/notes" className="project">
                        {' '}
                        Заметки <span>📝</span>
                    </Link>
                    <Link to="/cities" className="project">
                        {' '}
                        Города <span>🏙️</span>
                    </Link>
                    <Link to="/tic-Tac" className="project">
                        {' '}
                        Крестики ноли <span>⭕✖️</span>
                    </Link>
                    <Link to="/minesweeper" className="project">
                        {' '}
                        Сапёр <span>💣</span>
                    </Link>
                </nav>
            </div>
        </div>
    )
}
