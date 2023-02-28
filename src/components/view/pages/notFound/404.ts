import Page from '../../template/page';
import { IData } from '../translation/dataType';
import SelectionLang from '../translation/lang-selection';
class ErrorPage extends Page {
  chooseLangComponent!: SelectionLang;
  chooseLang!: number;
  wordsArr!: IData[];
  wordsChooseArr!: IData;

  private errorType: string;
  constructor(id: string, errorType: string) {
    super(id);
    this.errorType = errorType;
  }
  render() {
    this.getData();

    const renderErrorElement = document.createElement('div');
    renderErrorElement.className = 'page error_page	d-flex align-items-center justify-content-center vh-100';
    renderErrorElement.innerHTML = `
		<div class='text-center'>
			<h1 class='display-1 fw-bold'>404</h1>
			<p class='fs-3'>
			<span class='text-danger'>${this.wordsChooseArr.error_page_header}!</span> ${this.wordsChooseArr.error_page_not_found}.
			</p>
			<p class='lead'>${this.wordsChooseArr.error_page_no_exist}</p>
			<div class="btn btn-secondary"><a class = "error-page_link" href="#main-page">${this.wordsChooseArr.error_page_button}</a></div>
		</div>
		`;
    this.container.append(renderErrorElement);
    return this.container;
  }

  getData() {
    this.chooseLangComponent = new SelectionLang();
    this.wordsArr = this.chooseLangComponent.dataArr;
    this.chooseLang = this.chooseLangComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLang]
  }
}
export default ErrorPage;
