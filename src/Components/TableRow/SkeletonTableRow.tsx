import Skeleton from '@mui/material/Skeleton';

import { ReturnComponentType } from 'common/types';

export const SkeletonTableRow = ({
  colSpan,
}: {
  colSpan: number;
}): ReturnComponentType => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <Skeleton variant="rectangular" width={849} height={60} />
      </td>
    </tr>
  );
};
