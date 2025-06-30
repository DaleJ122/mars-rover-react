import { useState } from "react";
import roverService from "../services/RoverService.ts";
import type {RoverState} from "../services/RoverService.ts";
import type {Position} from "../models/Rover.ts";

export default function Rover() {
    const [commands, setCommands] = useState<string[]>(Array(5).fill(""));
    const [state, setState] = useState<RoverState>(roverService.current);
    const [history, setHistory] = useState<string[][]>([]);

    const handleInput = (i: number, value: string) => {
        const next = [...commands];
        next[i] = value;
        setCommands(next);
    };

    const run = () => {
        const trimmed = commands.filter((c) => c.trim() !== "");
        if (!trimmed.length) return;

        roverService.executeCommands(trimmed);
        setState({ ...roverService.current });
        setHistory((h) => [...h, trimmed]);
        setCommands(Array(5).fill(""));
    };

    const resetAll = () => {
        roverService.reset();
        setState({ ...roverService.current });
        setCommands(Array(5).fill(""));
        setHistory([]);
    };

    const isVisited = (p: Position) =>
        state.trail.some((t) => t.row === p.row && t.col === p.col);

    return (
        <>
            <h3>Mars Rover Controller</h3>

            <div className="row">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="col-12 col-sm-4 col-md-3 col-lg-2">
                        <input
                            className="form-control"
                            placeholder={`Command ${i + 1}`}
                            value={commands[i]}
                            onChange={(e) => handleInput(i, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-3">
                <button
                    className="btn btn-primary me-2"
                    onClick={run}
                    disabled={commands.every((c) => !c.trim())}
                >
                    Run
                </button>

                <button className="btn btn-danger" onClick={resetAll}>
                    Reset
                </button>
            </div>

            <p className="mt-3">
                Position: {state.cell} &nbsp;|&nbsp; Facing: {state.facing}
                {state.perimeterReached && (
                    <span className="text-danger ms-2">
            (Perimeter reached — commands halted)
          </span>
                )}
            </p>

            <div className="row">
                <div
                    className="col-12 col-lg-8 mt-4 overflow-auto"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                >
                    <div
                        className="d-grid"
                        style={{
                            gridTemplateColumns: `repeat(${state.gridCols}, 6px)`,
                        }}
                    >
                        {Array.from({ length: state.gridRows }).map((_, r) =>
                            Array.from({ length: state.gridCols }).map((_, c) => {
                                const here = { row: r, col: c };
                                const isRover =
                                    state.cell === r * state.gridCols + c + 1;
                                const visited = isVisited(here);

                                const bg = isRover
                                    ? "bg-danger"
                                    : visited
                                        ? "bg-info"
                                        : "bg-light";

                                return (
                                    <div
                                        key={`${r}-${c}`}
                                        className={`border border-secondary ${bg}`}
                                        style={{ width: 6, height: 6 }}
                                    />
                                );
                            }),
                        )}
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <h5 className="mt-4">Previous runs</h5>
                    {history.length > 0 && (
                        <ul className="list-group">
                            {history.map((h, idx) => (
                                <li key={idx} className="list-group-item py-1">
                  <span className="badge bg-secondary me-2">
                    {idx + 1}
                  </span>
                                    <code>{h.join(", ")}</code>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}
