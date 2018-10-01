import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span className="drag-handle">::</span>);

export default DragHandle;
