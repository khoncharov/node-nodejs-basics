const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
  const chunkStringified = Buffer.from(chunk.data).toString();
  if (chunkStringified.includes("CLOSE")) {
    process.exit(0);
  }
  process.stdout.write(`Received from master process: ${chunkStringified}\n`);
};

process.on("message", echoInput);
