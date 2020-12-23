//Image with jpg format ---------------------------------------------------------
//export const exposeCard = (card) => `/img/${card._rank}${card._suit}.jpg`
//export const hideCard = () => `/img/Red_back.jpg`


//Image with svg format ---------------------------------------------------------
export const exposeCard = (card) => `/pics/${card._rank}${card._suit}.svg`;
export const hideCard = () => `/pics/Card_back_01.svg`;

