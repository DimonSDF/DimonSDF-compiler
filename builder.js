import { GameMap } from "./arrows.js";

const top = new GameMap("AAAEAAAAAAANCRRAAIAAkACgALAAwADQAOAA8ABBAEUARgBHAEgASQBKAEsATABNAE4ATwAKIFACYAFwAEIBYgHCATMCUwJzApMCwwDzAkQDZAFmAbYB1gDXAfcAaAGoAdkBagG6AeoC2wFsAawB3QFuAb4B3wHvAhgIAgESASIBAwITAiMCBAMUAyQDBA2CAZIAogCyAKQBtADkAaUCtQLVA+UAuACqArwAEwfSAJQA9QW3ArkGuwa9Br8GARXiAIUCdgB3A4cA5wOIA4kDigOLA+sD+wCMA+wC/AKNA+0DjgOuAu4D/gKPAwsFgwGjAsUB5gL4A/0ADQKzBtMG4wQOBYQFxgXIBcoFzAXOBQMCxAJ1AZUBDAfUAvQFhgCmApgDmgOcA54DBgCWABAK9gaXAMcFmQDJBZsAywWdAM0FnwDPBQUEpwCpAKsArQCvAAAAAQAGCQQAABAAIAAwAAgDCgoyAgMAEwIjADQDBwMXADcAKwMOAh4ACwYzAScCGAIpATsALwM/ABACBAYkBhYCDAMUBTUABgMmAxMCBQcVASUDARQ2AzgDOQMKAhoCKgE6AwsAGwAMAhwDLAE8Aw0AHQAtAD0DLgI+Aw8CHwIBAAAACQkQQABBAEIAQwBEAEUARgBHAEgAiACYAKgAuADIANgA6AD4AAoRYAGgAdEBYgGyAdMB4wJUAmQBpAHVAWYBhgO3ANcAWAJoAXgAARWAA7AA4APwAIED4QLxA4IDogLiA/IAgwOEA7QA5AP0AIUD5QL1A6YA5gP2AAwGkAOSA5QDVQNWA5YDVwMOAsAFwgXEBRAFkQDBBZMAwwWVAMUBBQKhAKMApQATA7EGswa1AsYAAwF0ArYACwCXAwEAAQACARkAARAAIAEwAwEBEQMhADEDAgASAiICMgMDAhMCBAEUACQBNAMFARUDJQE1AwYAFgMmADYDCwEjAzMACQMIABgAKAA4AA==");
const bottom = new GameMap("AAACAAAAAAAFCREAABAAIAAhACIAIwAkACUAJgAnACgAKQAqACsALAAtAC4ALwALAAIBCgADABAAEwATAAQCAQAUAwEAAAAACQogACEAIgAjACQAJQAmACcACAAYACgA");
const line = new GameMap("AAACAAAAAAAHCQEAABAABAACAgcBEgEGAQoLAwATARYHFwAYABkAGgAbABwAHQAeAB8AEwAEBQYAFAQQAAUBAQAVAAEAAAABCgYQABEAEgATABQAFQAWAAkBCAAYAA==");

export function buildDisk(bytes) {
    const gameMap = new GameMap();

    let byteCount = bytes.length;

    if (byteCount < 8)
        bytes.push(...Array(8 - byteCount).fill(0));
    else if (byteCount % 4 != 0)
        bytes.push(...Array(4 - (byteCount % 4)).fill(0));
    
    byteCount = bytes.length;

    gameMap.paste(top, 1, -19);

    for (let row = 0; row < byteCount / 4; ++row) {
        let bytes_row = bytes.splice(0, 4);
        let y = row * 2 + 1;

        if (row > 0)
            gameMap.paste(line, 1, y);

        for (let i = 0; i < 4; ++i) {
            let byte = bytes_row.at(i);
            let x = i * 4 + 8;

            for (let j = 0; j < 4; ++j) {
                switch (byte & 0b11) {
                    case 0:
                        gameMap.setArrow(x + j, y, 1, 1);
                        break;
                    case 1:
                        gameMap.setArrow(x + j, y, 7, 1, true);
                        break;
                    case 2:
                        gameMap.setArrow(x + j, y, 7, 1);
                        break;
                    default:
                        gameMap.setArrow(x + j, y, 8, 1);
                }

                byte >>= 2;
            }
        }
    }
    gameMap.paste(bottom, 1, byteCount / 2 + 1);

    return gameMap.save();
}
