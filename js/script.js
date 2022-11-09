
const book = [];

function generateTodoObject(id, nameBook, writter, isCompleted) {
  return {
    id,
    nameBook,
    writter,
    isCompleted
  };
}

function findBook(bookId) {
  for (const bookItem of book) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in book) {
    if (book[index].id === bookId) {
      return index;
    }
  }
  return -1;
}



