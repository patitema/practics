const express = require('express')
const fs = require('fs').promises
const path = require('path')

const app = express()
const PORT = 3000
const DATA_FILE = path.join(__dirname, 'data', 'notes.json')

// Middleware
app.use(express.json())

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    )
    next()
})

// Helper function to read notes
async function readNotes() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading notes:', error)
        return []
    }
}

// Helper function to write notes
async function writeNotes(notes) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(notes, null, 2), 'utf8')
    } catch (error) {
        console.error('Error writing notes:', error)
        throw error
    }
}

// GET /api/notes - Get all notes
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await readNotes()
        res.json(notes)
    } catch (error) {
        res.status(500).json({ error: 'Failed to read notes' })
    }
})

// GET /api/notes/:id - Get note by ID
app.get('/api/notes/:id', async (req, res) => {
    try {
        const notes = await readNotes()
        const note = notes.find((n) => n.id === parseInt(req.params.id))

        if (!note) {
            return res.status(404).json({ error: 'Note not found' })
        }

        res.json(note)
    } catch (error) {
        res.status(500).json({ error: 'Failed to read note' })
    }
})

// POST /api/notes - Create new note
app.post('/api/notes', async (req, res) => {
    try {
        const { title, content } = req.body

        if (!title || !content) {
            return res
                .status(400)
                .json({ error: 'Title and content are required' })
        }

        const notes = await readNotes()
        const newNote = {
            id: Date.now(),
            title: title.trim(),
            content: content.trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        const updatedNotes = [newNote, ...notes]
        await writeNotes(updatedNotes)

        res.status(201).json(newNote)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' })
    }
})

// PUT /api/notes/:id - Update note
app.put('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, content } = req.body

        if (!title || !content) {
            return res
                .status(400)
                .json({ error: 'Title and content are required' })
        }

        const notes = await readNotes()
        const noteIndex = notes.findIndex((n) => n.id === parseInt(id))

        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found' })
        }

        const updatedNote = {
            ...notes[noteIndex],
            title: title.trim(),
            content: content.trim(),
            updatedAt: new Date().toISOString(),
        }

        notes[noteIndex] = updatedNote
        await writeNotes(notes)

        res.json(updatedNote)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' })
    }
})

// DELETE /api/notes/:id - Delete note
app.delete('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params
        const notes = await readNotes()
        const filteredNotes = notes.filter((n) => n.id !== parseInt(id))

        if (filteredNotes.length === notes.length) {
            return res.status(404).json({ error: 'Note not found' })
        }

        await writeNotes(filteredNotes)
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note' })
    }
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
