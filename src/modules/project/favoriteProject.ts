interface projectListProps {
  favorites: boolean;
  id: number;
  mainColor: string;
  participants: any;
  title: string;
}

export const checkFavorit = (e: any, projectsList: any, dispatch: any, favorite: any) => {
  console.log(favorite);
  const favoriteProjectList = [...projectsList].map((item) => {
    console.log(e.target.parentNode.parentNode);
    const itemId = Number(e.target.parentNode.parentNode.getAttribute('data-id'));
    console.log(itemId);
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
