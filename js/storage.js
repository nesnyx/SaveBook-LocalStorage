const STORAGE_KEY = 'BOOK_APPS';
const SAVED_EVENT = 'saved-book';
const RENDER_EVENT = 'render-book';
function isStorageExist()  {
  if (typeof (Storage) === undefined) {
    alert('Browser Not Supported');
    return false;
  }
  return true;
}


function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(book);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}


function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const bookData of data) {
      book.push(bookData);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}


function generateId() {
  return +new String();
}


function makeBook(bookObject) {

  const {id, nameBook, writter, isCompleted} = bookObject;

  const textTitle = document.createElement('h2');
  textTitle.innerText = nameBook;

  const textWritter = document.createElement('p');
  textWritter.innerText = writter;

  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textTitle, textWritter);

  const container = document.createElement('div');
  container.classList.add('item', 'shadow')
  container.append(textContainer);
  container.setAttribute('id', `book-${id}`);

  if (isCompleted) {

    const backButton = document.createElement('button');
    backButton.classList.add('back-button');
    backButton.addEventListener('click', function () {
      undoNameBookFromCompleted(id);
    });

    const deletedButton = document.createElement('button');
    deletedButton.classList.add('deleted-button');
    deletedButton.addEventListener('click', function () {
      removeNameBookFromCompleted(id);
    });

    container.append(backButton, deletedButton);
  } else {

    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.addEventListener('click', function () {
      addNameBookToCompleted(id);
    });

    container.append(checkButton);
  }

  return container;
}

function addBook() {
  const textBook = document.getElementById('title').value;
  const writter = document.getElementById('writter').value;

  const generatedID = generateId();
  const bookObject = generateTodoObject(generatedID, textBook, writter, false);
  book.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function addNameBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeNameBookFromCompleted(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  book.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoNameBookFromCompleted(bookId ) {

  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

document.addEventListener('DOMContentLoaded', function () {

  const submitForm = document.getElementById('form');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_EVENT, () => {
  console.log('Data berhasil di simpan.');
});

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBOOKList = document.getElementById('book');
  const listCompleted = document.getElementById('completed-book');

 
  uncompletedBOOKList.innerHTML = '';
  listCompleted.innerHTML = '';

  for (const bookItem of book) {
    const bookElement = makeBook(bookItem);
    if (bookItem.isCompleted) {
      listCompleted.append(bookElement);
    } else {
      uncompletedBOOKList.append(bookElement);
    }
  }
});