// 0 , comprobacion de la data por console
console.log(movies);
console.log("Ejemplo de array 100, director : " + movies[100]["director"]);

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  let arrayDirectoresNoRepetidos = [];

  moviesArray.forEach((movie) => {
    if (!arrayDirectoresNoRepetidos.includes(movie.director)) {
      arrayDirectoresNoRepetidos.push(movie.director);
    }
  });

  return arrayDirectoresNoRepetidos;
}

// comprobacion:
console.log(`Directores nuevo array limpio: ${getAllDirectors(movies)}`);

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  // Utilizamos el método filter para obtener un array con las películas de Steven Spielberg que sean del género Drama
  let peliculasSpielbergDrama = moviesArray.filter((movie) => {
    if (
      movie.director === "Steven Spielberg" &&
      movie.genre.includes("Drama")
    ) {
      return true;
    }
    return false;
  });
  // Obtenemos la longitud del array filtrado, que es la cantidad de películas de Steven Spielberg del género Drama
  let contador = peliculasSpielbergDrama.length;

  return contador;
}

// comprobacion:
console.log(
  `Películas de Steven Spielberg del género Drama: ${howManyMovies(movies)}`
);

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
// en la array es la propiedad score
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }
  let media = moviesArray.reduce((acc, movie) => {
    return acc + (movie.score || 0); // vamos a calcular la media incluso si una array no tiene ningun valor score
  }, 0);

  // la función reduce() va da la suma de los elementos.
  // ahora tenemos que calcular la media, con la mida total de los elementos en el array.
  // por ultimo le hacemos el redondeo
  let promedio = media / moviesArray.length;
  let numeroRedondeado = parseFloat(promedio.toFixed(2));
  return numeroRedondeado;
}

// comprobacion por console:
console.log(`La media de todas las peliculas es: ${scoresAverage(movies)}`); //8.31

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  let contador = 0;
  let peliculasDrama = moviesArray.filter((movie) => {
    if (movie.genre.includes("Drama")) {
      return (contador += movie.score);
    }
    return false;
  });
  // Obtenemos la longitud del array filtrado, que es la cantidad de películas de género Drama
  //console.log("score drama: ", contador);
  //console.log("peliculas drama: ", peliculasDrama.length);
  let promedio = contador / peliculasDrama.length;
  let numeroRedondeado = parseFloat(promedio.toFixed(2));
  return numeroRedondeado;
}

// console.log para comprobar el dato
console.log(`La media de películas de Drama es: ${dramaMoviesScore(movies)}`); // 8.32

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(moviesArray) {
  // primero hago una copia de la array original
  let cloneMovies = JSON.parse(JSON.stringify(movies));

  // ahora ordenamos por año
  // funcion de callback, con la array nueva. No la original
  cloneMovies.sort((elem2, elem1) => {
    if (elem1.year > elem2.year) {
      return -1;
    } else if (elem1.year < elem2.year) {
      return 1;
    } else if (elem1.year === elem2.year) {
      // Si los años son iguales, ordenar por título alfabéticamente
      return elem2.title.localeCompare(elem1.title);
    } else {
      return 0;
    }
  });
  // Return the sorted array
  return cloneMovies;
}

console.log(orderByYear(movies));
// comentario: a pesar que Jasmine me lo marque en rojo, yo en console veo la array bien ordenada, tanto por años como por titulos en casa del mismo año.

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  // primero hago una copia de la array original
  let cloneMovies = JSON.parse(JSON.stringify(movies));

  // 2 - ordena los elementos de la array albateticamente (todas) - función sort()
  cloneMovies.sort((movie1, movie2) => {
    return movie1.title.localeCompare(movie2.title);
  });

  // 3- ahora hay que coger solo las 20 primas - funcion slice()
  if (cloneMovies.length <= 20) {
    return cloneMovies;
  }

  return cloneMovies.slice(0, 20).map((movie) => movie.title);
}

console.log(orderAlphabetically(movies));
// como antes, en console veo el resultado correcto, pero Jasmine marca algunos puntos en rojo.

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  // clon de la array original con JSON.parse(JSON.stringify())
  let updatedMovies = JSON.parse(JSON.stringify(moviesArray));

  // Iteración forEach a través de la arrya updatedMovies
  updatedMovies.forEach((movie) => {
    const durationArr = movie.duration;
    const partes = durationArr.split(" "); // Dividir la cadena en partes basadas en el espacio
    const horas = parseInt(partes[0]); // Convertir la parte de las horas a número entero
    const minutos = parseInt(partes[1]); // Convertir la parte de los minutos a número entero

    const totalMinutos = horas * 60 + minutos; // Realizar la conversión a minutos

    // Actualizar la propiedad "duration" de la película con el valor de totalMinutos
    movie.duration = totalMinutos;
  });

  return updatedMovies;
}

console.log("prueba minutos", turnHoursToMinutes(movies)); //en console veo la duration traducido en minutos

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {
    return null;
  }

  // Se crea un objeto para almacenar la puntuación total y el recuento de películas de cada año
  const yearStats = {};

  // ahora se hace una iteracion forEach para recorrer el array y calcular la puntuación
  moviesArray.forEach((movie) => {
    const year = movie.year;
    const score = movie.score;

    // dentro del forEach ponemos un condicional para saber si el año ya existe y añadir la puntuación

    if (yearStats[year]) {
      yearStats[year].totalScore += score;
      yearStats[year].count += 1;
    } else {
      yearStats[year] = {
        totalScore: score,
        count: 1,
      };
    }
  });

  // Ahora se calcula el promedio para cada año y encuentra el mejor año
  let bestYear = null;
  let bestAverageScore = 0;

  // Iteracion for in para recorrer el objeto. Dentro montamos un if para saber la puntuación media es mayor que la mejor puntuacion media.

  for (const year in yearStats) {
    const averageScore = yearStats[year].totalScore / yearStats[year].count;
    if (averageScore > bestAverageScore) {
      bestAverageScore = averageScore;
      bestYear = year;
    }
  }

  if (bestYear === null) {
    return "No movies found.";
  }

  return `The best year was ${bestYear} with an average score of ${bestAverageScore.toFixed(
    2
  )}`;
}

//comprobación por console

console.log(bestYearAvg(movies)); // en consola veo "The best year was 1972 with an average score of 9.2"
