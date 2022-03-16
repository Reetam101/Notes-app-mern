const Note = require('../models/Note.js')
const asyncHandler = require('express-async-handler')

const getNotes = asyncHandler (async (req, res) => {
	const notes = await Note.find(req.user._id)
	return res.status(200).json(notes)
})

const createNote = asyncHandler(async (req, res) => {
	const { title, content, category } = req.body
	if(!title || !content || !category) {
		res.status(400)
		throw new Error("Please fill all the fields")
	} else {
		const new_note = new Note({ user: req.user._id, title, content, category })

		const createdNote = await new_note.save()
		return res.status(201).json(createdNote)
	}
}) 

const getNoteById = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id)

	if(note) {
		return res.status(200).json(note)
	} else {
		return res.status(404).json({ message: "Note not found!" })
	}

	//res.json(note)
})

const updateNote = asyncHandler(async (req, res) => {
	const { title, content, category } = req.body

	const note = await Note.findById(req.params.id)
	console.log(note.user)
	if(note.user.toString() !== req.user._id.toString()) {
		throw new Error("You can not perform this action")
	}

	if(note) {
		note.title = title
		note.content = content
		note.category = category

		const updatedNote = await note.save()
		return res.status(201).json(updatedNote)
	} else {
		res.status(404)
		throw new Error("Note not found")
	}

})

const deleteNote = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id)

	if(note.user.toString() !== req.user._id.toString()) {
		throw new Error("You can not perform this action")
	}

	if(note) {
		await note.remove()
		return res.status(201).json({ message: "Note removed" })
	} else {
		res.status(404)
		throw new Error("Note not found")
	}
})

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote }