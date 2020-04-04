const SCENE = {
  Width: 960,
  Height: 536
};

const GAME = {
  Reels: {
    Width: 239,
  },
  Slot: {
    Width: 235,
    Height: 145
  },
  countReels: 3,
  reelIds: [0,1,2,3,4,5],
  winTextDealy : 3000,
  wonTitle: 'You won!',
  lostTitle: 'You lost!'
};

const BLURRED_BG =  {
  Height: 220,
  bottomColor:0x006400,
  topColor: 0xffffff,
  topOpacity: 0.35,
  bottomOpacity: 0.65,
  bl: 60
}

const REEL_CONTAINER = {
  delayStop: 1000,
  columnPadding: 82,
  reelPositions: 5
}

const REEL = {
  w: 162,
  h: 156,
  step: 39
}


export {
  SCENE,
  GAME,
  BLURRED_BG,
  REEL_CONTAINER,
  REEL
};