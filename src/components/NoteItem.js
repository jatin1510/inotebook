import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

export default function NoteItem(props)
{
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title" style={{ margin: '.3rem 0 .5rem 0' }}>{note.title}<span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary">{note.tag}</span></h5>
                    <div style={{ border: '1px solid #dfdfdf', padding: '6px', borderRadius: '2%', height: '13rem', overflowY: 'auto' }}>
                        <p className="card-text text-break" style={{ minHeight: "11rem" }}>{note.description}</p>
                    </div>
                    <p className="card-text text-center" style={{ marginTop: '10px' }}><small className="text-muted">On <strong>{new Date(note.date).toLocaleDateString()} </strong> at <strong> {new Date(note.date).toTimeString().slice(0, 8)} {new Date(note.date).toTimeString().slice(0, 2) >= 12 ? "PM" : "AM"} </strong> </small></p>
                    <div className="d-flex justify-content-between">
                        <i className="far fa-edit" style={{ color: 'green', transform: 'scale(1.3)' }} onClick={() => { updateNote(note) }}></i>
                        <i className="far fa-trash-alt" style={{ color: 'red', transform: 'scale(1.3)' }} onClick={() => { deleteNote(note._id); props.showAlert('Deleted Successfully', 'success') }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
