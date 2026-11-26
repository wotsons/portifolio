import { describe, expect, it } from "vitest";
import { GRID, initialState, placeFood, step, turn, type SnakeState } from "./snake-logic";

const zero = () => 0;

describe("snake logic", () => {
  it("moves the head one cell in the current direction", () => {
    const s = initialState(zero);
    const next = step(s, zero);
    expect(next.snake[0]).toEqual({ x: 11, y: 10 });
    expect(next.snake).toHaveLength(3);
  });

  it("grows and scores when eating", () => {
    const s: SnakeState = { ...initialState(zero), food: { x: 11, y: 10 } };
    const next = step(s, zero);
    expect(next.score).toBe(1);
    expect(next.snake).toHaveLength(4);
  });

  it("ends the game on wall collision", () => {
    const s: SnakeState = { ...initialState(zero), snake: [{ x: GRID - 1, y: 0 }] };
    expect(step(s, zero).over).toBe(true);
  });

  it("ignores reversing into itself", () => {
    const s = initialState(zero);
    expect(turn(s, "left")).toBe("right");
    expect(turn(s, "up")).toBe("up");
  });

  it("never places food on the snake", () => {
    const snake = [{ x: 0, y: 0 }];
    expect(placeFood(snake, zero)).toEqual({ x: 1, y: 0 });
  });
});
