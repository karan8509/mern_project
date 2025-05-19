import '../pages.CssFile/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className='spinner-container'>
      <div className='spinner-wrapper'>
        <div className='spinner-bg' />
        <div className='spinner-fg' />
        <div className='sr-only'>Loading</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
