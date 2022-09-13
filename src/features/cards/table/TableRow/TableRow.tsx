import { FC, memo, MouseEvent } from 'react';
import style from '../UniversalTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootReducerType } from '../../../../store/store';
import { DeleteModal, LearnModal, UpdateModal } from 'Components/Modal';
import { ItemValues } from '../UniversalTable';

type TableRowT = {
  itemValues: ItemValues;
  itemName: 'packs' | 'cards';
};
export const TableRow: FC<TableRowT> = memo(({ itemValues, itemName }) => {
  const navigate = useNavigate();
  const profileId = useSelector<RootReducerType, string>(
    (state) => state.profile._id
  );

  const { tableValues, userId, id, cardsPackId } = itemValues;
  const isMyPack = profileId === userId;

  const onOpenCardClick = (e: MouseEvent<HTMLTableRowElement>) => {
    const element = e.target as HTMLElement;
    if (isMyPack && element.tagName !== 'BUTTON') {
      navigate(`/cards/${id}`);
    }
  };

  return (
    <tr
      onClick={(e) => {
        onOpenCardClick(e);
      }}
      className={isMyPack ? style.tableRowPointer : ''}
    >
      {Object.values(tableValues).map((item, i) => {
        return (
          <td key={i}>
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
        />
        <UpdateModal
          id={id}
          cardsPackId={cardsPackId}
          itemName={itemName}
          name={tableValues?.name}
          question={tableValues?.question}
          answer={tableValues?.answer}
          disabled={!isMyPack}
        />
        <LearnModal
          name={tableValues?.name}
          disabled={tableValues?.cardsCount! === 0}
          id={id}
        />
      </td>
    </tr>
  );
});
