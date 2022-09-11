import React, { FC, memo, MouseEvent } from 'react';
import style from '../UniversalTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SuperButton from '../../../../Components/TestComponents/components/c2-SuperButton/SuperButton';
import { RootReducerType } from '../../../../store/store';
import { COMPONENT_NAME } from '../../../../enum/ComponentName';
import { DeleteModal, LearnModal, UpdateModal } from 'Components/Modal';
import { ItemValues } from '../UniversalTable';

type TableRowT = {
  itemValues: ItemValues;
  itemName: 'packs' | 'cards';
  onDeleteButtonClick?: (id: string) => void;
  onUpdateButtonClick?: (id: string) => void;
  onLearnPackClick?: (packId: string) => void;
};
export const TableRow: FC<TableRowT> = memo(
  ({
    itemValues,
    itemName,
    onDeleteButtonClick,
    onUpdateButtonClick,
    onLearnPackClick,
  }) => {
    const navigate = useNavigate();
    /*   const userId = useSelector<RootReducerType, string>(
      (state) => state.profile._id
    ); */

    const { tableValues, userId, id, cardsPackId } = itemValues;
    /* const CONDITION_FOR_DISABLE_BUTTON = rowValues.user_id !== userId; */

    const onLearnButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onLearnPackClick!(id);
    };

    const onDeleteModalCallClick = (e: MouseEvent<HTMLButtonElement>) => {
      /*   e.stopPropagation();
      onDeleteButtonClick!(item._id); */
    };

    const onOpenCardClick = () => {
      /*   if (item.cardsCount! > 0 || item.user_id === userId) {
        navigate(`/cards/${item._id}`);
      } */
    };

    const onUpdateModalCallClick = (e: MouseEvent<HTMLButtonElement>) => {
      /*  e.stopPropagation();
      onUpdateButtonClick!(item._id); */
    };

    return (
      <tr onClick={onOpenCardClick}>
        {Object.values(tableValues).map((item, i) => {
          return (
            <td key={i}>
              <div className={style.cell}>{item}</div>
            </td>
          );
        })}
        <td className={style.btns}>
          <DeleteModal id={id} cardsPackId={cardsPackId} itemName={itemName} />
          <UpdateModal
            id={id}
            cardsPackId={cardsPackId}
            itemName={itemName}
            name={tableValues?.name}
            question={tableValues?.question}
            answer={tableValues?.answer}
          />
          <LearnModal
            name={tableValues?.name}
            disabled={tableValues?.cardsCount! === 0}
            id={id}
          />
          {/*  <SuperButton
            onClick={onLearnButtonClick}
            disabled={tableValues?.cardsCount! === 0}
          >
            Learn
          </SuperButton> */}
          {/*  <LearnModal id={id} cardsPackId={cardsPackId} itemName={itemName} /> */}
          {/*  <SuperButton
            disabled={CONDITION_FOR_DISABLE_BUTTON}
            onClick={onUpdateModalCallClick}
          >
            Edit
          </SuperButton> */}
          {/* {component === COMPONENT_NAME.PACKS && (
            <SuperButton
              onClick={onLearnButtonClick}
              disabled={item.cardsCount! === 0}
            >
              Learn
            </SuperButton>
          )} */}
        </td>
      </tr>
    );
  }
);
