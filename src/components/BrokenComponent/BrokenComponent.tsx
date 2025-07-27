const BrokenComponent = () => {
  throw new Error('Render-time error!');
};

export default BrokenComponent;
