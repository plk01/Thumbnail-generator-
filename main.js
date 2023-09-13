const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function generateThumbnail () {

// Sprawdzamy, czy podano odpowiednią liczbę argumentów
if (process.argv.length !== 4) {
  console.error('Użycie: node main.js [ścieżka_do_filmu] [nazwa_miniaturki]');
  process.exit(1);
}

// Pobieramy ścieżkę do filmu i nazwę miniaturki z argumentów wiersza poleceń
const inputFile = process.argv[2];
const outputFileName = process.argv[3];

// Sprawdzamy, czy podany plik filmu istnieje
if (!fs.existsSync(inputFile)) {
  console.error('Podany plik filmu nie istnieje.');
  process.exit(1);
}

// Wyodrębniamy ścieżkę do katalogu, w którym znajduje się skrypt
const scriptDir = path.dirname(__filename);

// Tworzymy ścieżkę do katalogu "miniaturki" w katalogu skryptu
const outputDirName = 'miniaturki';
const outputDir = path.join(scriptDir, outputDirName);

// Sprawdzamy, czy katalog "miniaturki" istnieje, jeśli nie, to go tworzymy
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Tworzymy ścieżkę do pliku miniaturki w katalogu "miniaturki"
const outputFile = path.join(outputDir, outputFileName);

// Wywołujemy komendę ffmpeg do generowania miniaturki
const cmd = `ffmpeg -i "${inputFile}" -ss 00:00:04 -vframes 1 "${outputFile}"`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error('Wystąpił błąd podczas generowania miniaturki:', error);
  } else {
    console.log('Miniaturka została wygenerowana pomyślnie i zapisana w:', outputFile);
  }
});
}

generateThumbnail();