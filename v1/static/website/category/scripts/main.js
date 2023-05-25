let allArticles, trendingArticles, featuredArticles, recentArticles;

const initTrendingArticles= (articles_) => {
  trendingArticles= articles_;
}

const initfeaturedArticles= (articles_) => {
  featuredArticles= articles_;
}

const initAllArticles= (articles_) => {
  featuredArticles= articles_;
}

const initRecentArticles= (articles_) => {
  recentArticles= articles_;
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