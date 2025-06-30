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

    rows = 100;
    cols = 100;

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

    /** returns false if move would step off north/west edge */
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

            if (nextRow < 0 || nextCol < 0) return false;

            if (nextRow >= this.rows) this.rows = nextRow + 1;
            if (nextCol >= this.cols) this.cols = nextCol + 1;

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
        this.rows = this.cols = 100;
        this.trail.clear();
        this.markVisited();
    }
}
