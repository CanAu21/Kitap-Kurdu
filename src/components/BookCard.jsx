const BookCard = ({
  book,
  handleDelete,
  handleRead,
  handleModal,
  setEditItem,
  setShowEditModal,
}) => {
  return (
    <div className="d-flex border shadow p-3 justify-content-between align-items-center">
      <div>
        <h5 style={{ textDecoration: book.isRead ? "line-through" : "none" }}>
          {book.title}
        </h5>
        <p>{book.date}</p>
      </div>

      <div className="btn-group">
        <button className="btn btn-danger" onClick={() => handleModal(book.id)}>
          Sil
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            // güncellenicek kitabı app.js e gönder
            setEditItem(book);
            // modalı aç
            setShowEditModal(true);
          }}
        >
          Düzenle
        </button>
        <button className="btn btn-success" onClick={() => handleRead(book)}>
          {book.isRead ? "Okundu" : "Okunmadı"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
