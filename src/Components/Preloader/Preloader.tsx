import preload from 'common/assets/svg/oval.svg';
import style from './Preloader.module.scss';

const Preloader = () => {
  return <img src={preload} alt="waiting..." className={style.loading} />;
};

export default Preloader;
