import React, { useState, useEffect } from 'react'

export function NoteForm({ note, onSave, onCancel }) {
    const [title, setTitle] = useState(note?.title || '')
    const [content, setContent] = useState(note?.content || '')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setTitle(note?.title || '')
        setContent(note?.content || '')
        setErrors({})
    }, [note])

    const validate = () => {
        const newErrors = {}
        if (!title.trim()) {
            newErrors.title = 'Введите заголовок'
        }
        if (!content.trim()) {
            newErrors.content = 'Введите содержимое'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return

        onSave({
            title: title.trim(),
            content: content.trim(),
        })
    }

    return (
        <div className="note-form-container">
            <form onSubmit={handleSubmit} className="note-form">
                <div className="form-group">
                    <label htmlFor="title">Заголовок</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={errors.title ? 'error' : ''}
                        placeholder="Введите заголовок заметки"
                    />
                    {errors.title && (
                        <span className="error-message">{errors.title}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="content">Содержимое</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={errors.content ? 'error' : ''}
                        placeholder="Введите содержимое заметки"
                        rows={6}
                    />
                    {errors.content && (
                        <span className="error-message">{errors.content}</span>
                    )}
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Сохранить
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-secondary"
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    )
}
