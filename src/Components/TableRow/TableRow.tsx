import { FC, memo, MouseEvent } from 'react';

import { faTrash, faPen, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useSearchParams } from 'react-router-dom';

import style from '../Table/Table.module.scss';

import { EntityType, ReturnComponentType } from 'common/types';
import { DeleteModal, LearnModal, UpdateModal } from 'components/Modal';
import { ItemValues } from 'components/Table/types';
import { EMPTY_STRING } from 'constants/index';
import { useAppSelector } from 'store';

type TableRowT = {
  itemValues: ItemValues;
  itemName: EntityType;
};
export const TableRow: FC<TableRowT> = memo(
  ({ itemValues, itemName }: TableRowT): ReturnComponentType => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const profileId = useAppSelector(state => state.profile._id);

    const { tableValues, userId, id, cardsPackId } = itemValues;
    const isMyPack = profileId === userId;

    const onOpenCardClick = (e: MouseEvent<HTMLTableRowElement>): void => {
      const element = e.target as HTMLElement;

      if (isMyPack && element.tagName !== 'BUTTON') {
        navigate(`/cards/${id}`, { state: { packs: searchParams } });
      }
    };

    return (
      <tr
        onClick={e => {
          if (itemName === 'packs') onOpenCardClick(e);
        }}
      >
        {Object.values(tableValues).map((item, i) => {
          return (
            <td key={i} className={isMyPack ? style.tableRowPointer : EMPTY_STRING}>
              <div className={style.cell}>{item}</div>
            </td>
          );
        })}
        <td className={style.btns}>
          <DeleteModal id={id} itemName={itemName} disabled={!isMyPack}>
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
