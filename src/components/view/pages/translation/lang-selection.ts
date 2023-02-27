import { dataRu } from './data-ru';

export default class SelectionLang {
  dataArr = [dataRu];
  lang!: string | null;

  determinationLanguage() {
    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    } else {
      localStorage.setItem('lang', 'ru')
      this.lang = 'ru';
    }
    return this.lang;
  }
  
}