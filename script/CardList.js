class CardList {
	constructor(container, card, addForm) {
		this.container = container;
		this.card = card;
		this.addForm = addForm;
	}
	addCard() {
		const cardName = this.addForm.elements.name.value;
		const cardLink = this.addForm.elements.link.value;
		const CreateNewCardFromUser = this.card.createCard(cardLink, cardName);
		this.container.insertAdjacentHTML('beforeend', CreateNewCardFromUser);
	};
	render(data) {
		for (const key of data) {
			const template = this.card.createCard(key.link, key.name);
			this.container.insertAdjacentHTML('beforeend', template);
		}
	}
	remove(event) {
		if (event.target.closest('.place-card__delete-icon')) {
			this.container.removeChild(event.target.closest('.place-card'));
		}
	};
};
