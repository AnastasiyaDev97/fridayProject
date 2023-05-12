import { memo } from 'react';

import { Chat } from 'components';

const Dialogs = memo(() => {
  return (
    <div>
      <Chat />
    </div>
  );
});

export default Dialogs;
