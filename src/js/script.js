'use strict';
const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

function renderBooks(){
  const bookList = document.querySelector('.books-list');
  for(let book of dataSource.books){
    const generatedHTML = template(book);
    const bookElement = utils.createDOMFromHTML(generatedHTML);
    bookList.appendChild(bookElement);
  }
}
renderBooks();

