import preloader from 'common/assets/svg/oval.svg';
import style from './Preloader.module.scss';

const Preloader = () => {
  return <img src={preloader} className={style.loading} alt="loading" />;
};

export default Preloader;
