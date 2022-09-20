import icons from '../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();

      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const prevPage = this._data.page - 1;
    const nextPage = this._data.page + 1;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
            <span>Page ${nextPage}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
          `;
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${prevPage}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${prevPage}</span>
        </button>`;
    }

    // Other Page
    if (curPage < numPages) {
      return `
        <button data-goto="${prevPage}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${prevPage}</span>
          </button>
          <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
            <span>Page ${nextPage}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    // Page 1, and the are NO other pages
    return '';
  }
}

export default new PaginationView();
