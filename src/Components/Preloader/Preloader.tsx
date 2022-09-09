import preload from 'common/assets/svg/oval.svg';
import s from './Preloader.module.scss';

const Preloader = () => {
  return <img src={preload} alt="waiting..." className={s.loading} />;
};

export default Preloader;
