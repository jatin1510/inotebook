import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export default function Notes(props)
{
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' })
    const ref = useRef(null)
    let navigate = useNavigate();

    useEffect(() =>
    {
        if (localStorage.getItem('token'))
            getNotes();
        else
            navigate('/login');

        // eslint-disable-next-line
    }, [])


    const updateNote = (currentNote) =>
    {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };

    const handleClick = (event) =>
    {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Note Updated", "success");
    };

    const onChange = (event) =>
    {
        setNote({ ...note, [event.target.name]: event.target.value })
    };

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type='text' className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} minLength={1} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={1} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} minLength={1} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss='modal' onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className="row my-3">
                    <h2>Your Notes</h2>
                    <div className="container mx-1">
                        {notes.length === 0 && 'No notes to display'}
                    </div>
                    {notes.map((note, index) =>
                    {
                        return (<NoteItem key={index} note={note} updateNote={updateNote} showAlert={props.showAlert} />)
                    })}
                </div>
            </div>
        </>
    )
}
