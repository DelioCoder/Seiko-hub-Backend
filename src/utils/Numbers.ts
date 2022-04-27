const generateRandom = (maxLimith: number = 100): number => {

    let rand = Math.random() * 100;

    rand = Math.floor(rand); // 99

    return rand;

}

export default generateRandom;