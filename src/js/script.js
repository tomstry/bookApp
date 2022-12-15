'use strict';
class BooksList{
  constructor(){
    const thisBooksList = this;
    thisBooksList.getElements();
    thisBooksList.initData();
    thisBooksList.renderBooks();
    thisBooksList.initActions();
  }

  getElements(){
    const thisBooksList = this;

    thisBooksList.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    thisBooksList.bookList = document.querySelector('.books-list');
    thisBooksList.forms = document.querySelector('.filters');

  }

  initData(){
    const thisBooksList = this;
    thisBooksList.data = dataSource.books;
    thisBooksList.favouriteBooks = [];
    thisBooksList.filters = [];
  }

  renderBooks(){
    const thisBooksList = this;

    for(let book of thisBooksList.data){
      const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
      const ratingWidth = (book.rating * 10);
      const generatedHTML = thisBooksList.template({
        id: book.id,
        name: book.name,
        price: book.price,
        image: book.image,
        rating: book.rating,
        ratingBgc: ratingBgc,
        ratingWidth: ratingWidth,
      });
      const bookElement = utils.createDOMFromHTML(generatedHTML);
      thisBooksList.bookList.appendChild(bookElement);
    }
  }

  initActions(){
    const thisBooksList = this;

    thisBooksList.bookList.addEventListener('dblclick',function(event){
      thisBooksList.favouriteBook(event);
    });
  
    thisBooksList.forms.addEventListener('click',function(event){
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        if(event.target.checked){
          thisBooksList.filters.push(event.target.value);
        }else{
          thisBooksList.filters.splice(thisBooksList.filters.indexOf(event.target.value),1);
        }
        thisBooksList.filterBooks();
      }
      
    });
  }

  favouriteBook(event){
    const thisBooksList = this;
    event.preventDefault();
    const parent = event.target.offsetParent;
    if(parent.classList.contains('book__image')){
      const linkId = parent.getAttribute('data-id');
      if(!thisBooksList.favouriteBooks.includes(linkId)){
        thisBooksList.favouriteBooks.push(linkId);
        parent.classList.add('favorite');
      }else{
        thisBooksList.favouriteBooks.splice(thisBooksList.favouriteBooks.indexOf(linkId),1);
        parent.classList.remove('favorite');
      }
    }
  }
  
  filterBooks(){
    const thisBooksList = this;
    for(let book of thisBooksList.data){
      let shouldBeHidden = false;
      for(let filter of thisBooksList.filters){
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

  determineRatingBgc(rating){
    let background = '';
    if(rating <= 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    }else if(rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    }else if(rating > 8 && rating <= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    }else{
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }

    return background;
  }
}

new BooksList();