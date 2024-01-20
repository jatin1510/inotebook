import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

export default function AddNote(props)
{
    const context = useContext(noteContext)
    const { addNote } = context;
    const handleClick = (event) =>
    {
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: '' })
        props.showAlert('Note Added Successfully', 'success');
    };
    const onChange = (event) =>
    {
        setNote({ ...note, [event.target.name]: event.target.value })
    };

    const [note, setNote] = useState({ title: '', description: '', tag: '' })
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className='my-3' onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type='text' className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} required />
                </div>
                <button type="submit" className="btn btn-success" >Add Note</button>
            </form>
        </div>
    )
}
