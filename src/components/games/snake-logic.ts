export interface Point {
  x: number;
  y: number;
}

export type Dir = "up" | "down" | "left" | "right";

export interface SnakeState {
  snake: Point[];
  dir: Dir;
  food: Point;
  score: number;
  over: boolean;
}

export const GRID = 20;

const VECTORS: Record<Dir, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };

export function initialState(rand = Math.random): SnakeState {
  const snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
  return { snake, dir: "right", food: placeFood(snake, rand), score: 0, over: false };
}

export function placeFood(snake: Point[], rand = Math.random): Point {
  const taken = new Set(snake.map((p) => `${p.x},${p.y}`));
  const free: Point[] = [];
  for (let y = 0; y < GRID; y++)
    for (let x = 0; x < GRID; x++) if (!taken.has(`${x},${y}`)) free.push({ x, y });
  return free[Math.floor(rand() * free.length)] ?? { x: 0, y: 0 };
}

/** Ignores reversing straight into yourself. */
export function turn(state: SnakeState, dir: Dir): Dir {
  return dir === OPPOSITE[state.dir] ? state.dir : dir;
}

export function step(state: SnakeState, rand = Math.random): SnakeState {
  if (state.over) return state;
  const v = VECTORS[state.dir];
  const head = { x: state.snake[0].x + v.x, y: state.snake[0].y + v.y };
  const eats = head.x === state.food.x && head.y === state.food.y;
  const body = eats ? state.snake : state.snake.slice(0, -1);

  const hitsWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID;
  const hitsSelf = body.some((p) => p.x === head.x && p.y === head.y);
  if (hitsWall || hitsSelf) return { ...state, over: true };

  const snake = [head, ...body];
  return {
    ...state,
    snake,
    food: eats ? placeFood(snake, rand) : state.food,
    score: eats ? state.score + 1 : state.score,
  };
}
