import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <i className="drag-handle material-icons">swap_vert</i>);

export default DragHandle;
