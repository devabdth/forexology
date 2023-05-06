let currentClassification, categories, articles, selectedCategories;

const initCategories= (categories_)=> {
  categories= categories_;
}

const initArticles= (articles_) => {
  articles= articles_;

}
const toggleClassificationDropdown = () => {
  document.getElementById(`classification-dropdown`).classList.toggle("show");
}

const classificationfilter = () => {
  var input, filter, ul, li, a, i;
  input = document.getElementById("classification-search");
  filter = input.value.toUpperCase();
  div = document.getElementById("classification-dropdown");
  button = div.getElementsByTagName("button");
  for (i = 0; i < button.length; i++) {
    txtValue = button[i].textContent || button[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      button[i].style.display = "";
    } else {
      button[i].style.display = "none";
    }
  }
}


const chooseParentCategory = (classification, lang) => {
  const btn = document.getElementById(`classification-dropbtn`);
  const categoriesContainer= document.querySelector('#filter-form #category');
  const checkboxesContainer= document.querySelector('#filter-form #category #checkboxes');
  currentCategory = classification['id'];
  btn.innerHTML = classification.name[lang];
  btn.innerText = classification.name[lang];
  btn.textContent = classification.name[lang];
  selectedCategories= [];

  let currentCategories= categories.filter((cat)=> classification.categories.includes(cat.id));
  checkboxesContainer.innerHTML = '';
  for (let cat of currentCategories) {
    console.log(cat)
    const container= document.createElement('div');

    const title= document.createElement('p');
    title.innerText= cat.name[lang];
    title.style.cursor= 'pointer';

    title.onclick= ()=> {
      title.classList.toggle('active');
      if(selectedCategories.includes(cat.id)){
        selectedCategories.splice(selectedCategories.indexOf(cat.id), 1);
        return;
      }
      selectedCategories.push(cat.id);
    }

    container.appendChild(title)

    checkboxesContainer.appendChild(container);
  }

  categoriesContainer.style.display= 'flex';  

  toggleClassificationDropdown();

}


const clearFilter= ()=> {
  const categoriesContainer= document.querySelector('#filter-form #category');
  const checkboxesContainer= document.querySelector('#filter-form #category #checkboxes');
  checkboxesContainer.innerHTML= '';
  categoriesContainer.style.display= 'none';
  selectedCategories= undefined;

}

const selectFragment= (tab, fragmentId) => {
  if(tab.classList.contains('active')) return;

  document.querySelector(`.articles-fragment.active`).classList.remove('active');
  document.querySelector(`#fragments-controllers .shadow-button.active`).classList.remove('active');


  tab.classList.add('active');
  document.querySelector(`.articles-fragment#${fragmentId}`).classList.add('active')
}