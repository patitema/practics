import React, { useState } from 'react'
import { useNotes } from '../hooks/Notes/useNotes'
import { NotesList } from '../components/Notes/NotesList'
import { NoteForm } from '../components/Notes/NoteForm'
import '../assets/styles/Notes.css'

export default function Notes() {
    const {
        notes,
        loading,
        error,
        createNote,
        updateNote,
        deleteNote,
        refreshNotes,
    } = useNotes()

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingNote, setEditingNote] = useState(null)

    const handleAddNote = () => {
        setEditingNote(null)
        setIsFormOpen(true)
    }

    const handleEditNote = (note) => {
        setEditingNote(note)
        setIsFormOpen(true)
    }

    const handleDeleteNote = (id) => {
        if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
            deleteNote(id)
        }
    }

    const handleSaveNote = (noteData) => {
        if (editingNote) {
            updateNote(editingNote.id, noteData)
        } else {
            createNote(noteData)
        }
        setIsFormOpen(false)
        setEditingNote(null)
    }

    const handleCancel = () => {
        setIsFormOpen(false)
        setEditingNote(null)
    }

    return (
        <div className="notes-page">
            <div className="notes-header">
                <h1 className="notes-title">Заметки</h1>
                {!isFormOpen && (
                    <button className="add-note-btn" onClick={handleAddNote}>
                        + Добавить заметку
                    </button>
                )}
            </div>

            {error && <div className="error">{error}</div>}

            {isFormOpen ? (
                <div className="notes-main">
                    <NoteForm
                        note={editingNote}
                        onSave={handleSaveNote}
                        onCancel={handleCancel}
                    />
                </div>
            ) : (
                <>
                    {loading ? (
                        <div className="loading">Загрузка заметок...</div>
                    ) : (
                        <NotesList
                            notes={notes}
                            onEdit={handleEditNote}
                            onDelete={handleDeleteNote}
                        />
                    )}
                </>
            )}
        </div>
    )
}
