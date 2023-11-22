/// BACKGROUND ///


let c = document.getElementById('canvas');
let ctx = c.getContext('2d');

let col = function (x, y, r, g, b) {
  ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  ctx.fillRect(x, y, 1, 1);
};

let R = function (x, y, t) {
  return Math.floor(128 + 128 * Math.cos((x * x - y * y) / 300 + t));
};

let G = function (x, y, t) {
  return Math.floor(128 + 128 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300));
};

let B = function (x, y, t) {
  let baseColor = 128 + 128 * Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100);
  return Math.floor(Math.max(0, baseColor - 100)); // Затемнение на 80 единиц
};



let t = 0;

let run = function () {
  for (let x = 0; x <= 35; x++) {
    for (let y = 0; y <= 35; y++) {
      col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
    }
  }
  t = t + 0.070;
  window.requestAnimationFrame(run);
};

run();


document.getElementById('toggleSwitch').addEventListener('change', function () {
  var t = 0;

  if (this.checked) {
    let c = document.getElementById('canvas');
    let ctx = c.getContext('2d');
    
    let col = function (x, y, r, g, b) {
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(x, y, 1, 1);
    };
    
    let R = function (x, y, t) {
      return Math.floor(128 + 128 * Math.cos((x * x - y * y) / 300 + t));
    };
    
    let G = function (x, y, t) {
      return Math.floor(128 + 128 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300));
    };
    
    let B = function (x, y, t) {
      let baseColor = 128 + 128 * Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100);
      return Math.floor(Math.max(0, baseColor - 100)); // Затемнение на 80 единиц
    };
    
    
    
    let t = 0;
    
    let run = function () {
      for (let x = 0; x <= 35; x++) {
        for (let y = 0; y <= 35; y++) {
          col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
        }
      }
      t = t + 1.0;
      window.requestAnimationFrame(run);
    };
    
    run();
  } else {
    let c = document.getElementById('canvas');
    let ctx = c.getContext('2d');
    
    let col = function (x, y, r, g, b) {
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(x, y, 1, 1);
    };
    
    let R = function (x, y, t) {
      return Math.floor(128 + 128 * Math.cos((x * x - y * y) / 300 + t));
    };
    
    let G = function (x, y, t) {
      return Math.floor(128 + 128 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300));
    };
    
    let B = function (x, y, t) {
      let baseColor = 128 + 128 * Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100);
      return Math.floor(Math.max(0, baseColor - 100)); // Затемнение на 80 единиц
    };
    
    
    
    let t = 0;
    
    let run = function () {
      for (let x = 0; x <= 35; x++) {
        for (let y = 0; y <= 35; y++) {
          col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
        }
      }
      t = t + 0.070;
      window.requestAnimationFrame(run);
    };
    
    run();
  }

  console.log('The value of t is: ' + t);
});














///PUSH-UP WINDOW///

document.addEventListener("DOMContentLoaded", function () {
  // Получаем форму и кнопку
  var genForm = document.getElementById("genForm");
  var submitButton = document.getElementById("button_submit"); // Обновленный идентификатор

  // Обработчик события на отправку формы
  genForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Предотвращаем стандартное поведение формы

      // Показываем модальное окно
      document.getElementById("myModal").style.display = "block";

      // Устанавливаем путь к изображению в модальном окне
      document.getElementById("modalImage").src = "/materials/generated/image_001.png";
  });

  // Обработчик события на закрытие модального окна
  document.querySelector(".close").addEventListener("click", function () {
      document.getElementById("myModal").style.display = "none";
  });
});

