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
  return Math.floor(Math.max(0, baseColor - 100)); 
};

let t = 0;

let run = function () {
  for (let x = 0; x <= 35; x++) {
    for (let y = 0; y <= 35; y++) {
      col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
    }
  }
  t = t + 0.040;
  window.requestAnimationFrame(run);
};

run();



/// HARD MODE ///

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
      return Math.floor(Math.max(0, baseColor - 10));
    };
    
    let t = 0;
    
    let run = function () {
      for (let x = 0; x <= 35; x++) {
        for (let y = 0; y <= 35; y++) {
          col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
        }
      }
      t = t + 0.7;
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
      t = t + 0.040;
      window.requestAnimationFrame(run);
    };
    
    run();
  }

});

/// GENERATION ///

document.addEventListener("DOMContentLoaded", function () {
  
  var genForm = document.getElementById("genForm");
  var submitButton = document.getElementById("button_submit"); 

  
  genForm.addEventListener("submit", function (event) {
      event.preventDefault(); 

      document.getElementById("myModal").style.display = "block";

      const emotionValue = document.querySelector('input[name="emotion"]:checked').value;
      const feelingValue = document.querySelector('input[name="feeling"]:checked').value;
      const lightingValue = document.querySelector('input[name="lighting"]:checked').value;
      const phraseValue = document.querySelector('input[name="phrase"]:checked').value;
      const atmosphereValue = document.querySelector('input[name="atmosphere"]:checked').value;

      fetch('http://127.0.0.1:5000/run_code', {
        method: 'POST',
        body: JSON.stringify({
            user_value_1: emotionValue,
            user_value_2: feelingValue,
            user_value_3: lightingValue,
            user_value_4: phraseValue,
            user_value_5: atmosphereValue
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    setTimeout(function() {
      document.getElementById("modalImage").src = "static/materials/generated/generated_image.png";
      document.getElementById("loading").style.display = "none";

    }, 15_000);
  });



  document.querySelector(".close").addEventListener("click", function () {
      document.getElementById("myModal").style.display = "none";
      document.getElementById("modalImage").src = "none";
      document.getElementById("loading").style.display = "block";
  });
});

function updateModalValues() {
  // Получаем значения из полей ввода
  var nameValue = document.getElementById('nameInput').value;
  var dreamValue = document.getElementById('dreamInput').value;
  var dateValue = document.getElementById('dateInput').value;

  // Присваиваем значения элементам div
  document.getElementById('modalName').textContent = nameValue;
  document.getElementById('modalNameDream').textContent = dreamValue;
  document.getElementById('modalDate').textContent = dateValue;
}

// Назначаем обработчики событий для полей ввода
document.getElementById('nameInput').addEventListener('input', updateModalValues);
document.getElementById('dreamInput').addEventListener('input', updateModalValues);
document.getElementById('dateInput').addEventListener('input', updateModalValues);

/// SEARCHING ///

document.getElementById('search').addEventListener('input', function() {

  const searchValue = this.value.toLowerCase();

  const cards = document.querySelectorAll('.TextCard');

  cards.forEach(function(card) {
      const cardText = card.textContent.toLowerCase();
      const parentCard = card.closest('.card');

      if (cardText.includes(searchValue)) {
          parentCard.classList.remove('hidden');
      } else {
          parentCard.classList.add('hidden');
      }
  });
});



/// SORTING AND FILTERING ///

let ascendingOrderAlphabet = true;
        let ascendingOrderViews = false;
        let ascendingOrderDate = false;
        let showAllInsta = true;

        function sortCards(key, ascendingOrder) {
            const cardsContainer = document.getElementById('cards');
            const cards = Array.from(cardsContainer.querySelectorAll('.card'));

            cards.sort(function(a, b) {
                let valueA, valueB;

                if (key === 'CaptionDate') {
                    valueA = a.querySelector(`.${key}`).textContent.split('.').reverse().join('');
                    valueB = b.querySelector(`.${key}`).textContent.split('.').reverse().join('');
                } else {
                    valueA = a.querySelector(`.${key}`).textContent.toLowerCase();
                    valueB = b.querySelector(`.${key}`).textContent.toLowerCase();
                }

                return ascendingOrder ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            });

            cards.forEach(function(card) {
                cardsContainer.appendChild(card);
            });
        }

        function toggleInstaCards(show) {
            const cards = document.querySelectorAll('.card');

            cards.forEach(function(card) {
                const instaLink = card.querySelector('.noInsta');
                if (instaLink) {
                    card.style.display = show ? 'none' : 'block';
                }
            });
        }

        document.getElementById('sortButtonAlphabet').addEventListener('click', function() {
            sortCards('TextCard', ascendingOrderAlphabet);
            this.textContent = ascendingOrderAlphabet ? 'Z-A' : 'A-Z';
            ascendingOrderAlphabet = !ascendingOrderAlphabet;
        });

        document.getElementById('sortButtonViews').addEventListener('click', function() {
            sortCards('CaptionViews', ascendingOrderViews);
            this.textContent = ascendingOrderViews ? 'Popular first' : 'Unpopular first';
            ascendingOrderViews = !ascendingOrderViews;
        });

        document.getElementById('sortButtonDate').addEventListener('click', function() {
            sortCards('CaptionDate', ascendingOrderDate);
            this.textContent = ascendingOrderDate ? 'Recent first' : 'Old first';
            ascendingOrderDate = !ascendingOrderDate;
        });

        document.getElementById('sortButtonInsta').addEventListener('click', function() {
            showAllInsta = !showAllInsta;
            toggleInstaCards(showAllInsta);
            this.textContent = showAllInsta ? 'Show all' : 'Only with contacts';
        });

        document.addEventListener('DOMContentLoaded', function () {
          // Обработчик события клика на кнопку
          document.querySelector('.modalButton2').addEventListener('click', function () {
            // Получаем изображение
            var image = document.getElementById('modalImage');
        
            // Создаем временный холст
            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext('2d');
        
            // Рисуем изображение на холсте
            context.drawImage(image, 0, 0);
        
            // Получаем data URL изображения в формате PNG
            var dataUrl = canvas.toDataURL('image/png');
        
            // Создаем ссылку для скачивания
            var link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'generated_image.png';
        
            // Добавляем ссылку на страницу и эмулируем клик
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
        });


        function showMessage() {
          alert("Coming soon :)");
        }