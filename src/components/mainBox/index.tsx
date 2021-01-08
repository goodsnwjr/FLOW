import React, { useEffect, useState } from 'react';

interface projectItem {
  id: number;
  title: string;
  people: number;
}

const MainBox = () => {
  const [title, setTitle] = useState<string>('');
  const [project, setProject] = useState<projectItem[]>([]);

  useEffect(() => {
    const projectGetItem = JSON.parse(`${localStorage.getItem('project')}`);
    setProject(projectGetItem);
  }, []);

  return (
    <>
      {project &&
        Object.values(project).map((items, index) => {
          return (
            <div key={items.id}>
              <h1>{items.title}</h1>
              <span>{items.people}명 참여중</span>
            </div>
          );
        })}
    </>
  );
};

export default MainBox;
