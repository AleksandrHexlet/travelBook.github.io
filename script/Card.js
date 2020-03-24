class Card {
  constructor(link, name) {
    this.link = link;
    this.name = name;

  }
  like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
  };
  createCard(link, name) {
    const template = `<div class="place-card"> 
                    <div class="place-card__image" style="background: url(${link})"> 
                      <button class="place-card__delete-icon"></button>
                    </div>
                    <div class="place-card__description">
                      <h3 class="place-card__name">${name}</h3>
                      <button class="place-card__like-icon"></button>
                    </div>
                  </div>`;
    return template;                                                                                                  //Создали функцию для добавления карточки без глобальных переменных, только локальные (addLink, addName их имена могут быть любые,мы просто говорим функции,что на входе будут две переменные)эти две переменные в нашем случае имя и линк(ссылка)и мы их задаем в функции,чтобы функция понимала,что придет имя и линк и их надо вставить в карточку в определенное место для этого в вставляемом коде мы прописываем подобные конструкции style="background: url(${addLink})"> .Отличие insertAdjacentHTML (он быстрее работает т.к. не переписывает элемент, а просто вставляет в конец)от innerHTML в,том что insertAdjacentHTML просто вставляеи текст как разметку в в то место куда укажем первым аргументом в нашем случае beforeend, второй аргумент сама разметка. innerHTML перезаписывает(удаляет и вновь создает) элемент на новый с добавленной разметкой

  }
};