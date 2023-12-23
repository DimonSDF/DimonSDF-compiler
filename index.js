import { Compiler } from "./asm.js";
import { buildDisk } from "./builder.js";

function compile(asm) {
    const compiler = new Compiler();
    compiler.compile(asm);

    if (compiler.errors.length > 0) {
        let errorMessage = `Compilation failed (${compiler.errors.length} error${compiler.errors.length > 1 ? "s" : ""})\n\n`;
        for (const error of compiler.errors)
            errorMessage += `Error at line ${error.position[0] + 1}, column ${error.position[1] + 1}: ${error.message}\n\n`;
        return errorMessage;
    }

    return buildDisk(compiler.bytes);
}

document.addEventListener("DOMContentLoaded", () => {
    const source = document.getElementById("source");
    const output = document.getElementById("output");

    source.addEventListener("input", () => {
        output.value = compile(source.value);
    });
});
