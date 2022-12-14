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

const favouriteBooks = [];

const booksLinks = document.querySelectorAll('.books-list .book__image');
function initActions(){
  for(let link of booksLinks){
    link.addEventListener('dblclick',function(event){
      event.preventDefault();
      const linkId = link.getAttribute('data-id');
      if(!favouriteBooks.includes(linkId)){
        favouriteBooks.push(linkId);
        link.classList.add('favorite');
      }else{
        favouriteBooks.splice(favouriteBooks.indexOf(linkId),1);
        link.classList.remove('favorite');
      }
    })
  }
}

initActions();
