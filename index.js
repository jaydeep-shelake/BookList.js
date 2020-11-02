class Book{
    constructor(title,author,bookNo){
     this.title=title;
     this.author=author;
     this.bookNo=bookNo;
    }
}

//UI class

class UI{
   static displayBook(){
       
    const books= Store.getBooks();
    books.forEach((book)=> UI.addBookList(book));
   }
   static addBookList(book){
    const list = document.getElementById('book-list');

    const row= document.createElement('tr');
    row.innerHTML=`<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.bookNo}</td>
    <td><a class="btn btn-danger delete"><i class="fas fa-trash"></i></a></td>`;
    list.appendChild(row);
   }

   static deletBook(elem){
     if(elem.classList.contains('delete')){
         elem.parentElement.parentElement.remove();
     }
     else if(elem.parentElement.classList.contains('delete')){
        elem.parentElement.parentElement.parentElement.remove();
     }
   }

   static showAlert(message,className){
    const div = document.createElement('div');
    div.className=`alert alert-${className}`;
    div.innerHTML=message;
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    container.insertBefore(div,form); // insert div before form
    setTimeout(()=>{document.querySelector('.alert').remove()},1200);
   }
}

//storage
class Store{
    static getBooks(){
     let books=localStorage.getItem('books');
     if(books===null){
         booksObj=[];
     }
     else{
         booksObj =JSON.parse(books);
     }
     return booksObj;
    }
    static addBook(book){
     const books = Store.getBooks();
     books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(bookNo){
     const books = Store.getBooks();
     books.forEach((book,index)=>{
        if(book.bookNo=== bookNo){
          books.splice(index,1);
        }
     });
     localStorage.setItem('books',JSON.stringify(books));
    }
}
//events
document.addEventListener('DOMContentLoaded',UI.displayBook);

// event to add bok
const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit',(e)=>{
 //get form value
 e.preventDefault();
 const tilte = document.getElementById('title');
 const author = document.getElementById('author');
 const bookNo = document.getElementById('book-number');
 // validate
 if(tilte.value=='' || author.value==''||bookNo.value==''){
     UI.showAlert('Please fill the form ','danger')
 } 
 if(tilte.value==''){
   tilte.classList.add('border-danger');
 }
  if(author.value==''){
   author.classList.add('border-danger');
 }
  if(bookNo.value==''){
  bookNo.classList.add('border-danger');
 }
 else{
// insantiate book

    const book = new Book(tilte.value,author.value,bookNo.value);
    
 //add book to ui
    UI.addBookList(book);
 //add book to stroe
    Store.addBook(book);

    UI.showAlert('<strong>Successfull</strong>,form submited succesfully','success');

    tilte.classList.remove('border-danger');
    author.classList.remove('border-danger');
    bookNo.classList.remove('border-danger'); 
    
    // clear flieds
    tilte.value="";
    author.value="";
    bookNo.value="";
 }
});



document.getElementById('book-list').addEventListener('click',(e)=>{
  UI.deletBook(e.target);
 Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
 UI.showAlert('<strong>Removed</strong> book successfully ','info')

});