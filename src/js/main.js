import LoadMoreBtn from "./components/load-more-btn";
import updateMarkup from "./update-markup";
import apiService from "./apiService";
import refs from "./refs";

//===

const loadMoreBtn = new LoadMoreBtn('button[data-action="load-more"]');

refs.searchForm.addEventListener("submit", searchFormSubmitHandler);
loadMoreBtn.refs.button.addEventListener("click", updateBtns);

function searchFormSubmitHandler(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  apiService.query = form.elements.query.value;

  clearMarkup();
  apiService.resetPage();
  form.reset();
  updateBtns();
}

function updateBtns() {
  loadMoreBtn.disable();

  apiService.fetchImages().then((hits) => {
    updateMarkup(hits);
    loadMoreBtn.show();
    loadMoreBtn.enable();

    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: "smooth",
    });
  });
}

function clearMarkup() {
  refs.gallery.innerHTML = "";
}
