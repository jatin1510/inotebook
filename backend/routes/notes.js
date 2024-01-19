const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');

// ROUTE 1 : fetch all notes of a user using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) =>
{
    try {
        const notes = await Note.find({ user: req.user.id })
            .then(data => { res.send(data); })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

// ROUTE 2 : add a new note of a user using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title").exists(),
    body("description", "Description must be atleast 5 characters").exists(),
], async (req, res) =>
{
    try {
        // If there are errors, then return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const note = await Note.create({
            user: req.user.id, title, description, tag
        })
            .then((data) =>
            {
                res.send(data);
            })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

// ROUTE 3 : update an existing note of a user using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) =>
{
    try {
        const { title, description, tag } = req.body;
        // create a new note object
        const newNote = {};
        if (title)
            newNote.title = title;
        if (description)
            newNote.description = description;
        if (tag)
            newNote.tag = tag;

        // find the note to be updated and update it
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(400).json({ message: "Not found" });
        }

        // Allow updation only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not Allowed" });
        }

        await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            .then((data) =>
            {
                res.send(data);
            })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

// ROUTE 4 : delete an existing note of a user using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) =>
{
    try {
        // find the note to be deleted and delete it
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(400).json({ message: "Not found" });
        }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not Allowed" });
        }

        await Note.findByIdAndDelete(req.params.id)
            .then((data) =>
            {
                res.json({ message: "Success: Note has been deleted" });
            })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;