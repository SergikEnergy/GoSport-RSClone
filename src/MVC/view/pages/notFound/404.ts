import Page from '../../template/page';
class ErrorPage extends Page {
  private errorType: string;
  constructor(id: string, errorType: string) {
    super(id);
    this.errorType = errorType;
  }
  render() {
    const renderErrorElement = document.createElement('div');
    renderErrorElement.className = 'page error_page	d-flex align-items-center justify-content-center vh-100';
    renderErrorElement.innerHTML = `
		<div class='text-center'>
			<h1 class='display-1 fw-bold'>404</h1>
			<p class='fs-3'>
			<span class='text-danger'>Opps!</span> Page not found.
			</p>
			<p class='lead'>The page you’re looking for doesn’t exist.</p>
			<div class="btn btn-secondary"><a class = "error-page_link" href="#main-page">Go home page</a></div>
		</div>
		`;
    this.container.append(renderErrorElement);
    return this.container;
  }
}
export default ErrorPage;
