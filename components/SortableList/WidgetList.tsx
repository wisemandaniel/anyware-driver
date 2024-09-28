import React from 'react';

import Tile from './Tile';
import SortableList from './SortableList';
import { View } from 'react-native';
import { MARGIN } from './Config';

const tiles = [
  {
    id: 'spent',
  },
  {
    id: 'cashback',
  },
  {
    id: 'recent',
  },
  {
    id: 'cards',
  },
];

const WidgetList = () => {
  return (
    <View
      style={{
        paddingHorizontal: MARGIN,
        marginBottom: 80,
      }}>
      <SortableList
        editing={true}
        onDragEnd={(positions) => console.log(JSON.stringify(positions, null, 1))}>
        {[...tiles].map((tile, index) => (
          <Tile onLongPress={() => true} key={tile.id + '-' + index} id={tile.id} />
        ))}
      </SortableList>
    </View>
  );
};

export default WidgetList;
