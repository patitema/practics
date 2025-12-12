import React from 'react'

export function NoteCard({ note, onEdit, onDelete }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="note-card">
            <div className="note-header">
                <h3 className="note-title">{note.title}</h3>
                <div className="note-actions">
                    <button
                        onClick={() => onEdit(note)}
                        className="btn btn-edit"
                        title="Редактировать"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(note.id)}
                        className="btn btn-delete"
                        title="Удалить"
                    >
                        🗑️
                    </button>
                </div>
            </div>
            <div className="note-content">{note.content}</div>
            <div className="note-footer">
                <span className="note-date">
                    Создано: {formatDate(note.createdAt)}
                </span>
                {note.createdAt !== note.updatedAt && (
                    <span className="note-date">
                        Обновлено: {formatDate(note.updatedAt)}
                    </span>
                )}
            </div>
        </div>
    )
}
