import { useState, useEffect } from 'react'
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [notes, setnotes] = useState([
    {
      title: "dummy title 1",
      description: "dummy description"
    },
    {
      title: "dummy title 2",
      description: "dummy description"
    },
    {
      title: "dummy title 3",
      description: "dummy description"
    },
    {
      title: "dummy title 4",
      description: "dummy description"
    }
  ]);

  // Modal & Edit States
  const [showModal, setShowModal] = useState(false);
  const [editNoteData, setEditNoteData] = useState({ id: "", title: "", description: "" });

  console.log("hello guis");

  // ============== fetch notes from backend api and set the notes state ==============

  function fetchNotes() {
    axios.get(`${API_URL}/api/notes`)
      .then((res) => {
        // console.log(res.data.notes);
        setnotes(res.data.notes);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  // ============== create a note and save in mongodb ==============
  function createNote(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const note = { title, description };
    // console.log(note);
    postNote(note);
  }


  function postNote(note) {
    axios.post(`${API_URL}/api/notes`, note)
      .then((res) => {
        console.log(res.data);
        fetchNotes();   // fetch the updated notes list after creating a new note
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ============= delete a note by id ==============
  function deleteNote(id) {
    axios.delete(`${API_URL}/api/notes/${id}`)
      .then((res) => {
        console.log(res.data);
        fetchNotes();   // fetch the updated notes list after deleting a note
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ============= update logic (PATCH) ==============
  
  // 1. Open modal and fill it with existing data
  function openEditModal(note) {
    setEditNoteData({ id: note._id, title: note.title, description: note.description });
    setShowModal(true);
  }

  // 2. Handle the actual PATCH request
  function handleUpdate(e) {
    e.preventDefault();
    axios.patch(`${API_URL}/api/notes/${editNoteData.id}`, {
      title: editNoteData.title,
      description: editNoteData.description
    })
    .then(() => {
      setShowModal(false);
      fetchNotes();
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="app-container">
      <div className={`main-content ${showModal ? 'blurred' : ''}`}>
        <form className='form-create-note' onSubmit={createNote}>
          <input name='title' type="text" placeholder='Title' required />
          <input name='description' type="text" placeholder='Description' required />
          <button type='submit'> Create Note </button>
        </form>

        <div className="notes">
          {notes.map((note) => (
            <div key={note._id} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              
              {/* Restored Icons here */}
              <button className='dlt-btn' onClick={() => deleteNote(note._id)}>
                <i className="ri-delete-bin-line"></i> Trash
              </button>
              <button className='update-btn' onClick={() => openEditModal(note)}>
                <i className="ri-edit-line"></i> Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Edit Note</h2>
            <form onSubmit={handleUpdate}>
              <input 
                type="text" 
                value={editNoteData.title} 
                onChange={(e) => setEditNoteData({...editNoteData, title: e.target.value})} 
              />
              <textarea 
                value={editNoteData.description} 
                onChange={(e) => setEditNoteData({...editNoteData, description: e.target.value})} 
              />
              <div className="modal-actions">
                <button type="submit" className="save-btn">
                   <i className="ri-save-line"></i> Save
                </button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                   <i className="ri-close-line"></i> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
