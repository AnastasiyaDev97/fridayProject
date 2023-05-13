import Skeleton from '@mui/material/Skeleton';

import style from '../Table/Table.module.scss';

import { ReturnComponentType } from 'common/types';

export const SkeletonTableRow = ({
  colSpan,
}: {
  colSpan: number;
}): ReturnComponentType => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <Skeleton variant="rectangular" className={style.tableRowPointer} />
      </td>
    </tr>
  );
};
