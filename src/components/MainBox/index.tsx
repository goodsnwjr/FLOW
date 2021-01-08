import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// interface favoritesProps {
//   favorites: boolean;
//   setFavorites: Dispatch<SetStateAction<boolean>>;
// }

interface projectItem {
  id: number;
  title: string;
  people: number;
}

const ItemStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 20px;
  box-sizing: border-box;
`;
const ItemBoxStyle = styled.div`
  margin-right: 15px;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  background: ${(props) => props.color};
  font-size: 16px;
`;

const FavoritesProjectStyle = styled(FontAwesomeIcon)`
  color: block;
`;

const MainBox = () => {
  const [title, setTitle] = useState<string>('');
  const [project, setProject] = useState<projectItem[]>([]);
  const color = ['pink', 'blue', 'yellow', 'red', 'green', 'gray'];

  useEffect(() => {
    const projectGetItem = JSON.parse(`${localStorage.getItem('project')}`);
    setProject(projectGetItem);
  }, []);

  return (
    <ItemStyle>
      {project &&
        Object.values(project).map((items, index) => {
          console.log(items.title);
          return (
            <ItemBoxStyle key={items.id} color={color[index]}>
              <h1>{items.title}</h1>
              <p>{items.people}명 참여중</p>
              <FavoritesProjectStyle
                className="favorites-project"
                icon={faStar}
                // onClick={setFavorites}
              ></FavoritesProjectStyle>
            </ItemBoxStyle>
          );
        })}
    </ItemStyle>
  );
};

export default MainBox;
