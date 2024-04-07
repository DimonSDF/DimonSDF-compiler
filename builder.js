import { GameMap } from "./arrows.js";

const top = new GameMap("AAAEAAAAAAANCRRAAIAAkACgALAAwADQAOAA8ABBAEUARgBHAEgASQBKAEsATABNAE4ATwAKIFACYAFwAEIBYgHCATMCUwJzApMCwwDzAkQDZAFmAYYAtgHXAfcAaAGoAdkBagG6AeoC2wFsAawB3QFuAb4B3wHvAhgIAgESASIBAwITAiMCBAMUAyQDBA2CAZIAogCyAKQBtADkAaUCtQLVA+UAuACqArwAEwfSAJQA9QW3BrkGuwa9Br8GARLiAIcD5wOIA4kDigOLA+sD+wCMA+wC/AKNA+0DjgOuAu4D/gKPAwsEgwGjAuYC+AP9AA0CswbTBuMEDgaEAcUFxgXIBcoFzAXOBQMCxAKFAZUBDAbUAvQFpgKYA5oDnAOeAwYAlgAQCvYGlwDHBZkAyQWbAMsFnQDNBZ8AzwUFBKcAqQCrAK0ArwAAAAEABgkEAAAQACAAMAAIAwoKMgIDABMCIwA0AwcDFwA3ACsDDgIeAAsGMwEnAhgCKQE7AC8DPwAQAgQGJAYWAgwDFAU1AAYDJgMTAgUHFQElAwEUNgM4AzkDCgIaAioBOgMLABsADAIcAywBPAMNAB0ALQA9Ay4CPgMPAh8CAQAAAAsJEEAAQQBCAEMARABFAEYARwBIAIgAmACoALgAyADYAOgA+AAKEWABoAHRAWIBsgHTAeMCZAGkAVUC1QFmAacAtwDXAFgCaAF4AAEVgAOwAOAD8ACBA+EC8QOCA6IC4gPyAIMDhAO0AOQD9ACFA+UC9QOGA+YD9gAMBZADkgOUA1YDlgNXAw4CwAXCBcQFEAWRAMEFkwDDBZUAxQEFAqEAowClABMDsQazBrUGxgADAXUCtgAHAKYABACHAwsAlwMBAAEAAgEZAAEQACABMAMBAREDIQAxAwIAEgIiAjIDAwITAgQBFAAkATQDBQEVAyUBNQMGABYDJgA2AwsBIwMzAAkDCAAYACgAOAA=");
const bottom = new GameMap("AAACAAAAAAAHCQEAABAABAACAgcBEgEGAQoLAwATARYHFwAYABkAGgAbABwAHQAeAB8AEwAEBQYAFAQQAAUBAQAVAAEAAAABCgYQABEAEgATABQAFQAWAAkBCAAYAA==");
const line = new GameMap("AAACAAAAAAAGCQEAABAAEwACAQYAEgAQAAMBDAATAAcABAEKCxQDFQIWAhcCGAIZAhoCGwIcAh0CHgIfAgEAAAABCgQQAhECEgITAhQCCQEGABYA");

export function buildDisk(bytes) {
    const gameMap = new GameMap();

    let byteCount = bytes.length;

    if (byteCount < 8)
        bytes.push(...Array(8 - byteCount).fill(0));
    else if (byteCount % 4 != 0)
        bytes.push(...Array(4 - (byteCount % 4)).fill(0));
    
    byteCount = bytes.length;

    gameMap.paste(top, 1, 0);

    for (let row = 0; row < byteCount / 4; ++row) {
        let bytes_row = bytes.splice(0, 4);
        let y = row * 2 + 3;

        if (row > 0)
            gameMap.paste(line, 1, y);

        for (let i = 0; i < 4; ++i) {
            let byte = bytes_row.at(i);
            let x = i * 4 + 6;

            for (let j = 0; j < 4; ++j) {
                switch (byte & 0b11) {
                    case 0:
                        gameMap.setArrow(x + j, y, 1, 1);
                        break;
                    case 1:
                        gameMap.setArrow(x + j, y, 7, 1);
                        break;
                    case 2:
                        gameMap.setArrow(x + j, y, 7, 1, true);
                        break;
                    default:
                        gameMap.setArrow(x + j, y, 8, 1);
                }

                byte >>= 2;
            }
        }
    }
    gameMap.paste(bottom, 0, byteCount / 2 + 2);

    return gameMap.save();
}
