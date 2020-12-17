const shipFactory = (length) => {

  const hitStatus = Array(length).fill(false);

  const hit = (num) => {
    hitStatus[num] = true;
  };

  const isSunk = () => {
    return hitStatus.every(a => a === true);
  };

  return {
    length: length,
    hitStatus: hitStatus,
    isSunk: isSunk,
    hit: hit
  };
  
};

export default shipFactory;