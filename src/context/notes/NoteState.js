import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) =>
{
    const host = 'http://localhost:8000';
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes = async () =>
    {
        // api call
        const note = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });
        await note.json()
            .then((note) =>
            {
                setNotes(notes.concat(note));
            })
    };

    // Add a note
    const addNote = async (title, description, tag) =>
    {
        // api call
        const note = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            'Access-Control-Allow-Origin': '*',
            body: JSON.stringify({ title, description, tag })
        });
        note.json()
            .then((note) =>
            {
                setNotes(notes.concat(note));
            })
    };

    // Edit a note
    const editNote = async (id, title, description, tag) =>
    {
        // api call
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            'Access-Control-Allow-Origin': '*',
            body: JSON.stringify({ title, description, tag })
        });

        const newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    };

    // Delete a note
    const deleteNote = async (id) =>
    {
        // api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            'Access-Control-Allow-Origin': '*',
        });
        console.log(response);

        setNotes(notes.filter(note => note._id !== id));
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;