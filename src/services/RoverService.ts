import Rover from "../models/Rover.ts";
import type { Direction, Position } from "../models/Rover.ts";

export interface RoverState {
    gridRows: number;
    gridCols: number;
    cell: number;
    facing: Direction;
    perimeterReached: boolean;
    trail: Position[];
}

export interface CommandBatch {
    commands: string[];
    afterState: RoverState;
}

class RoverService {
    private rover = new Rover();
    private perimeterHit = false;

    history: CommandBatch[] = [];

    get current(): RoverState {
        return {
            gridRows: this.rover.rows,
            gridCols: this.rover.cols,
            cell: this.rover.cellNumber,
            facing: this.rover.facing,
            perimeterReached: this.perimeterHit,
            trail: this.rover.visited,
        };
    }

    runBatch(commands: string[]): RoverState {
        this.executeCommands(commands);
        const result = this.current;
        this.history.unshift({ commands: [...commands], afterState: result });
        return result;
    }

    reset() {
        this.rover.reset();
        this.perimeterHit = false;
        this.history = [];
    }

    /** ---------- helpers ---------- */

    executeCommands(commands: string[]) {
        this.perimeterHit = false;
        let taken = 0;

        for (const raw of commands) {
            if (taken >= 5) break;
            const cmd = raw.trim();
            if (!cmd) continue;

            const metres = parseInt(cmd.replace(/[mM]$/, ""), 10);
            if (!isNaN(metres)) {
                if (!this.rover.move(metres)) {
                    this.perimeterHit = true;
                    break;
                }
            } else if (/^left$/i.test(cmd)) this.rover.turnLeft();
            else if (/^right$/i.test(cmd)) this.rover.turnRight();

            taken++;
        }
    }

    clearPerimeterFlag() {
        this.perimeterHit = false;
    }
}

export default new RoverService();
