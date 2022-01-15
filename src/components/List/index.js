import React, { useContext } from 'react';

import { MdAdd } from 'react-icons/md';

import { Container } from './styles';
import Card from '../Card';
import { useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

const List = ({ data, index: listIndex }) => {
  const { move } = useContext(BoardContext);

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover: (item, monitor) => {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = data.cards.length;

      if (draggedListIndex === targetListIndex) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });

  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type='button'>
            <MdAdd size={24} color='#fff' />
          </button>
        )}
      </header>
      <ul>
        {data.cards.map((card, index) => (
          <Card key={card.id} listIndex={listIndex} index={index} data={card} />
        ))}
      </ul>
      <div className='fill' ref={dropRef} />
    </Container>
  );
};

export default List;
