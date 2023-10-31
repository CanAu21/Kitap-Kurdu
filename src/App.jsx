import { useState } from "react";
import BookCard from "./components/BookCard";
import { toast } from "react-toastify";
import EditModal from "./components/EditModal";

function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // ekle butonuna tıklandığı anda çalışan fonksiyon
  const handleSubmit = (e) => {
    // sayfa yenilenmesini engelleme
    e.preventDefault();
    // inputun değeri boş ise uyarı verme
    if (!bookName) {
      toast.warn("Lütfen Kitap ismi Giriniz", {autoClose:2000})
      // fonksiyonu durdurma
      return;
    }
    // kitap için gerekli bilgilere sahip obje oluşturma
    const newBook = {
      id: new Date().getTime(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    // oluşturulan kitap objesini kitaplar dizisine aktarma
    // spread operatör kullanarak önceden eklenenlerde muhafaza edilecek
    setBooks([...books, newBook]);

    // eleman ekledikten sonra inputun sıfırlanması
    // inputun içinde value ile eşleştirilmesi lazım
    setBookName("");

    // bildirim ekleme
    toast.success("Kitap Eklendi", { autoClose: 2000 });
  };

  // modalı aç kapa
  const handleModal = (id) => {
    // modal açılmadan önce state aktarma
    setDeleteId(id);
    // modalı açma
    setShowConfirm(true);
  };

  // sil butonuna bastığında çalışacak fonksiyon
  const handleDelete = (deletingId) => {
    // silinecek id'ye eşit olmayan objeleri al ve bir diziye aktar
    const filtred = books.filter((item) => item.id !== deletingId);

    // oluşan diziyi state aktar
    setBooks(filtred);

    // bildirim verme
    toast.error("Kitap Silindi", { autoClose: 2500 });
  };

  // Okunda butonuna basınca çalışacak fonksiyon
  const handleRead = (book) => {
    // okundu değerini tersine çevirme (isRead)
    const updatedBook = { ...book, isRead: !book.isRead };
    // dizinin kopyasını oluşturma
    const cloneBooks = [...books];
    // düzenlenecek olan kitabın dizideki sırasını bulma
    const index = cloneBooks.findIndex((item) => item.id === book.id);
    // okunmuş olan kitabı diziden çıkar ve yerine güncellemiş versiyonunu koy
    cloneBooks.splice(index, 1, updatedBook);
    // güncel olan kopya diziyi state aktar
    setBooks(cloneBooks);
  };

  // kitabı güncelleyen fonksiyon
  const handleEditBook = () => {
    // değişecek elemanın dizideki sırasını bulma
    const index = books.findIndex((book) => book.id === editItem.id);
    // kitaplar dizisinin kopyasını oluşturma
    const cloneBooks = [...books];
    // eski kitabı diziden çıkar ve yerine yenisini koy
    cloneBooks.splice(index,1,editItem);
    // state güncelle
    setBooks(cloneBooks);
    // modalı kapat
    setShowEditModal(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-dark text-light px-5 py-2 fs-5 text-center">
        Kitap Kurdu
      </div>

      <div className="container border">
        {/* Form */}
        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4">
          <input
            onChange={(e) => setBookName(e.target.value)}
            value={bookName}
            className="form-control shadow"
            type="text"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>

        {/* Listeleme kısmı */}
        <div className="d-flex flex-column gap-3 py-5">
          {/* eğer state içerisi boş ise ekrana bunu yaz */}
          {books.length === 0 && <h4>Henüz bir kitap eklenmedi</h4>}

          {/* eğer state içerisinde eleman varsa onları listele */}
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              handleModal={handleModal}
              handleRead={handleRead}
              setShowEditModal={setShowEditModal}
              setEditItem={setEditItem}
            />
          ))}
        </div>
      </div>
      {/* modal */}
      {showConfirm && (
        <div className="confirm-modal">
          <div className="modal-inner shadow">
            <h5>Silmek İstiyor musunuz ?</h5>
            <button
              className="btn btn-warning"
              onClick={() => setShowConfirm(false)}
            >
              Vazgeç
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(deleteId);
                setShowConfirm(false);
              }}
            >
              Onayla
            </button>
          </div>
        </div>
      )}

      {/* Düzenleme Modalı */}
      {showEditModal && (
         <EditModal
         setShowEditModal={setShowEditModal}
         setEditItem={setEditItem}
         editItem={editItem}
         handleEditBook={handleEditBook}
         />
      )}
    </div>
  );
}

export default App;
