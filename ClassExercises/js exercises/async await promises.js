const fs = require('fs');
const path = require('path');

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

async function readFileAsync(path) {
  return await fs.promises.readFile(path, 'utf8');
}

async function getFileSize(path) {
  const stats = await fs.promises.stat(path);
  return stats.size;
}

async function listFiles(dir) {
  return await fs.promises.readdir(dir);
}


async function readFilesInOrder(files) {
  for (const file of files) {
    const content = await fs.promises.readFile(file, 'utf8');
    console.log(content);
  }
}

async function readFilesParallel(files) {
  const promises = files.map(file => fs.promises.readFile(file, 'utf8'));
  const contents = await Promise.all(promises);
  contents.forEach(content => console.log(content));
}

function fileExists(path) {
  return fs.promises.access(path)
    .then(() => true)
    .catch(() => false);
}

async function copyFile(src, dest) {
  const data = await fs.promises.readFile(src);
  await fs.promises.writeFile(dest, data);
}

async function mergeFiles(files, output) {
  const contents = await Promise.all(
    files.map(file => fs.promises.readFile(file, 'utf8'))
  );
  const mergedContent = contents.join('\n');
  await fs.promises.writeFile(output, mergedContent, 'utf8');
}

async function searchWordInFiles(dir, word) {
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.promises.stat(filePath);
    
    if (stats.isFile()) {
      const content = await fs.promises.readFile(filePath, 'utf8');
      if (content.includes(word)) {
        console.log(file);
      }
    }
  }
}