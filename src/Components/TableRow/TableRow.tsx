import { FC, memo, MouseEvent } from 'react';

import { faTrash, faPen, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from '../Table/Table.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { DeleteModal } from 'components/Modal/DeleteModal';
import { LearnModal } from 'components/Modal/LearnModal';
import { UpdateModal } from 'components/Modal/UpdateModal';
import { ItemValues } from 'components/Table/Table';
import { EMPTY_STRING } from 'constants/index';
import { RootState } from 'store';

type TableRowT = {
  itemValues: ItemValues;
  itemName: 'packs' | 'cards';
};
export const TableRow: FC<TableRowT> = memo(
  ({ itemValues, itemName }: TableRowT): ReturnComponentType => {
    const navigate = useNavigate();
    const profileId = useSelector<RootState, string>(state => state.profile._id);

    const { tableValues, userId, id, cardsPackId } = itemValues;
    const isMyPack = profileId === userId;

    const onOpenCardClick = (e: MouseEvent<HTMLTableRowElement>): void => {
      const element = e.target as HTMLElement;

      if (isMyPack && element.tagName !== 'BUTTON') {
        navigate(`/cards/${id}`);
      }
    };

    return (
      <tr
        onClick={e => {
          onOpenCardClick(e);
        }}
      >
        {Object.values(tableValues).map(item => {
          return (
            <td key={item} className={isMyPack ? style.tableRowPointer : EMPTY_STRING}>
              <div className={style.cell}>{item}</div>
            </td>
          );
        })}
        <td className={style.btns}>
          <DeleteModal
            id={id}
            cardsPackId={cardsPackId}
            itemName={itemName}
            disabled={!isMyPack}
          >
            <FontAwesomeIcon icon={faTrash} />
          </DeleteModal>
          <UpdateModal
            id={id}
            cardsPackId={cardsPackId}
            itemName={itemName}
            name={tableValues?.name}
            question={tableValues?.question}
            answer={tableValues?.answer}
            disabled={!isMyPack}
          >
            <FontAwesomeIcon icon={faPen} />
          </UpdateModal>
          {itemName === 'packs' && (
            <LearnModal
              name={tableValues?.name}
              disabled={tableValues?.cardsCount === 0}
              id={id}
            >
              <FontAwesomeIcon icon={faGraduationCap} />
            </LearnModal>
          )}
        </td>
      </tr>
    );
  },
);
