export const checkFavorit = (e: any, projectsList: any, dispatch: any, favorite: any) => {
  const favoriteProjectList = [...projectsList].map((item) => {
    const itemId = Number(e.target.parentNode.parentNode.getAttribute('data-id'));
    if (item.id === itemId) {
      return Object.assign({}, item, {
        favorites: item.favorites === true ? false : true,
      });
    } else {
      return item;
    }
  });
  dispatch(favorite(favoriteProjectList));
};
