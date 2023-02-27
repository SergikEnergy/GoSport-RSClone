import { dataRu } from './data-ru';

export default class SelectionLang {
  dataArr = [dataRu];
  lang!: number | null;

  determinationLanguage() {
    if (localStorage.getItem('lang')) {
      this.lang = Number(localStorage.getItem('lang'));
    } else {
      localStorage.setItem('lang', '0')
      this.lang = 0;
    }
    return this.lang;
  }
  
}