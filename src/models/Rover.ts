export const MAX_GRID = 100 as const;

export const Direction = {
    North: "North",
    East: "East",
    South: "South",
    West: "West",
} as const;
export type Direction = typeof Direction[keyof typeof Direction];

export interface Position {
    row: number;
    col: number;
}

export default class Rover {
  row = 0;
  col = 0;
  facing: Direction = Direction.South;

  readonly rows = MAX_GRID;      // fixed-size grid
  readonly cols = MAX_GRID;

  private trail = new Set<string>();

  constructor() {
    this.markVisited();
  }

  private markVisited() {
    this.trail.add(`${this.row}-${this.col}`);
  }

  turnLeft() {
    this.facing =
      this.facing === Direction.North
        ? Direction.West
        : this.facing === Direction.West
        ? Direction.South
        : this.facing === Direction.South
        ? Direction.East
        : Direction.North;
  }

  turnRight() {
    this.facing =
      this.facing === Direction.North
        ? Direction.East
        : this.facing === Direction.East
        ? Direction.South
        : this.facing === Direction.South
        ? Direction.West
        : Direction.North;
  }

  /** returns false if move would hit the fixed 100 × 100 perimeter */
  move(metres: number): boolean {
    for (let i = 0; i < metres; i++) {
      const [nextRow, nextCol] =
        this.facing === Direction.North
          ? [this.row - 1, this.col]
          : this.facing === Direction.East
          ? [this.row, this.col + 1]
          : this.facing === Direction.South
          ? [this.row + 1, this.col]
          : [this.row, this.col - 1];

      // perimeter check – origin (0,0) to (99,99)
      if (
        nextRow < 0 ||
        nextCol < 0 ||
        nextRow >= MAX_GRID ||
        nextCol >= MAX_GRID
      )
        return false;

      this.row = nextRow;
      this.col = nextCol;
      this.markVisited();
    }
    return true;
  }

  get cellNumber() {
    return this.row * this.cols + this.col + 1;
  }

  get visited(): Position[] {
    return Array.from(this.trail).map((p) => {
      const [r, c] = p.split("-").map(Number);
      return { row: r, col: c };
    });
  }

  reset() {
    this.row = this.col = 0;
    this.facing = Direction.South;
    this.trail.clear();
    this.markVisited();
  }
}
