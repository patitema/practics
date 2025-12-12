import React from 'react'
import { NoteCard } from './NoteCard'

export function NotesList({ notes, onEdit, onDelete }) {
    if (notes.length === 0) {
        return (
            <div className="empty-state">
                <p>У вас пока нет заметок</p>
                <p>Нажмите "Добавить заметку", чтобы создать первую</p>
            </div>
        )
    }

    return (
        <div className="notes-list">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}
