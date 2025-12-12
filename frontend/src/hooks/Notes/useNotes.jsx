import { useState, useEffect, useCallback } from 'react'

const API_BASE_URL = 'http://localhost:3000/api/notes'

export function useNotes() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadNotes = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(API_BASE_URL)
            if (!response.ok) {
                throw new Error('Не удалось загрузить заметки')
            }
            const data = await response.json()
            setNotes(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadNotes()
    }, [loadNotes])

    const createNote = useCallback(async (noteData) => {
        try {
            setError(null)
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
            })

            if (!response.ok) {
                throw new Error('Не удалось создать заметку')
            }

            const newNote = await response.json()
            setNotes((prev) => [newNote, ...prev])
            return newNote
        } catch (err) {
            setError(err.message)
            throw err
        }
    }, [])

    const updateNote = useCallback(async (id, noteData) => {
        try {
            setError(null)
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
            })

            if (!response.ok) {
                throw new Error('Не удалось обновить заметку')
            }

            const updatedNote = await response.json()
            setNotes((prev) =>
                prev.map((note) => (note.id === id ? updatedNote : note))
            )
            return updatedNote
        } catch (err) {
            setError(err.message)
            throw err
        }
    }, [])

    const deleteNote = useCallback(async (id) => {
        try {
            setError(null)
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Не удалось удалить заметку')
            }

            setNotes((prev) => prev.filter((note) => note.id !== id))
        } catch (err) {
            setError(err.message)
            throw err
        }
    }, [])

    return {
        notes,
        loading,
        error,
        createNote,
        updateNote,
        deleteNote,
        refreshNotes: loadNotes,
    }
}
