import { IGetUser } from '../../../authorization/authorization.types';
import { createElement } from '../../../template/createElement';
import IPhoto from './handlerPhoto.types';

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export default class HandlerPhoto {
  parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
  }

  renderPhoto(urlToAvatar: string): void {
    const pathToAvatar = `https://go-sport-app-clone.onrender.com/${urlToAvatar}`;
    //find root for avatar box

    const loaderContainer = createElement('div', this.parent, 'loader__container content-box');

    const form = document.createElement('form');
    form.className = 'hidden-action';
    form.setAttribute('id', 'formAvatar');

    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('id', 'fileLoader');

    const sendButton = document.createElement('button');
    sendButton.setAttribute('type', 'submit');
    sendButton.setAttribute('id', 'sendAvatar');
    form.append(fileInput);
    form.append(sendButton);

    const imgBox = document.createElement('div');
    imgBox.className = 'content-box__img';
    const avatarImg = document.createElement('img');
    avatarImg.className = 'content-box__img_avatar';
    avatarImg.setAttribute('id', 'avatar');
    avatarImg.setAttribute('src', `${pathToAvatar}`);
    avatarImg.setAttribute('alt', 'user avatar');

    const buttonBox = document.createElement('div');
    buttonBox.className = 'content-box__button';
    const buttonImg = document.createElement('button');
    buttonImg.setAttribute('id', 'avatar-btn');
    const imgCreate = document.createElement('img');
    imgCreate.className = 'add-avatar';
    imgCreate.setAttribute('src', './icons/add photo.png');
    imgCreate.setAttribute('alt', 'add avatar');
    const imgChange = document.createElement('img');
    imgChange.className = 'change-avatar hidden-action';
    imgChange.setAttribute('src', './icons/replace photo.png');
    imgChange.setAttribute('alt', 'change avatar');

    this.parent.append(loaderContainer);
    loaderContainer.append(form);
    loaderContainer.append(imgBox);
    imgBox.append(avatarImg);
    loaderContainer.append(buttonBox);
    buttonBox.append(buttonImg);
    buttonImg.append(imgCreate);
    buttonImg.append(imgChange);
  }

  async uploadPhoto(options: IPhoto, data: IGetUser) {
    const body = data;
    // const id = localStorage.getItem('currentUserId'); //here will be the ID of current profile
    // const urlToUpdateProfiles = `https://go-sport-app-clone.onrender.com/api/profiles/${id}`;

    const input = document.querySelector('#fileLoader') as HTMLInputElement;
    const sendButton = document.querySelector('#sendAvatar') as HTMLButtonElement;
    const formAction = document.querySelector('#formAvatar') as HTMLFormElement;

    const buttonAvatar = document.getElementById('avatar-btn') as HTMLButtonElement;

    if (options.accept && Array.isArray(options.accept)) {
      input.setAttribute('accept', options.accept.join(','));
    }

    async function sendServer(file: HTMLInputElement) {
      const formData = new FormData();
      if (file && file.files) {
        const fileFromInput = file.files[0];

        const keys = Object.entries(body);
        // console.log(keys);
        // console.log(body);
        for (let i = 0; i < keys.length; i++) {
          formData.append(keys[i][0], keys[i][1]);
        }
        formData.append('files', fileFromInput);
        console.log(...formData);

        //   fetch(urlToUpdateProfiles, {
        //     method: 'PUT',
        //     body: formData,
        //   })
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log('success', data);
        //     })
        //     .catch((error) => {
        //       console.error(error);
        //     });
      }
    }

    const handlerAvatar = () => input.click();
    const handlerSubmit = () => {
      sendButton.click();
    };

    const changeHandler = (event: Event) => {
      // console.log(event.target.files);
      const file = event.target as HTMLInputElement;
      if (file && file.files?.length === 0) {
        return;
      }
      handlerSubmit();
      sendServer(file);

      if (file.files) {
        const files = Array.from(file.files);
        files.forEach((file) => {
          if (!file.type.match('image')) {
            return;
          }
        });
      }
    };
    buttonAvatar.addEventListener('click', handlerAvatar);
    input.addEventListener('change', changeHandler);
    formAction.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  // changeAvatar(photoUrl: string) {
  //   const baseUrl = `https://go-sport-app-clone.onrender.com/`;
  //   const newUrlToPhoto = baseUrl + photoUrl;
  //   const PhotoElement = document.querySelector();
  // }
}
