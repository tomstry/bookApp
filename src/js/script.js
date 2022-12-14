'use strict';
const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

const bookList = document.querySelector('.books-list');
const forms = document.querySelector('.filters');

function renderBooks(){
  for(let book of dataSource.books){
    const generatedHTML = template(book);
    const bookElement = utils.createDOMFromHTML(generatedHTML);
    bookList.appendChild(bookElement);
  }
}

const favouriteBooks = [];
const filters = [];

function favouriteBook(event){
  event.preventDefault();
  const parent = event.target.offsetParent;
  if(parent.classList.contains('book__image')){
    const linkId = parent.getAttribute('data-id');
    if(!favouriteBooks.includes(linkId)){
      favouriteBooks.push(linkId);
      parent.classList.add('favorite');
    }else{
      favouriteBooks.splice(favouriteBooks.indexOf(linkId),1);
      parent.classList.remove('favorite');
    }
  }
}
function filterBooks(){
  for(let book of dataSource.books){
    let shouldBeHidden = false;
    for(let filter of filters){
      if(!book.details[filter]){
        shouldBeHidden = true;
        break;
      }
    }
    if(shouldBeHidden){
      document.querySelector('.book__image[data-id="'+ book.id +'"]').classList.add('hidden');
    }else{
      document.querySelector('.book__image[data-id="'+ book.id +'"]').classList.remove('hidden');
    }
  }
  
}
function initActions(){
  bookList.addEventListener('dblclick',function(event){
    favouriteBook(event);
  });

  forms.addEventListener('click',function(event){
    if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
      if(event.target.checked){
        filters.push(event.target.value);
      }else{
        filters.splice(filters.indexOf(event.target.value),1);
      }
      filterBooks();
    }
    
  });
}

renderBooks();
initActions();
 