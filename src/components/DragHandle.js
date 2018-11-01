import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span className="drag-handle material-icons">swap_vert</span>);

export default DragHandle;
