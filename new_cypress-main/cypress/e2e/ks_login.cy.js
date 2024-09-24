describe('Проверка авторизации', function () {

    it('Верный логин и верный пароль', function () {
       cy.visit('https://login.qa.studio/'); // зашли на сайт
       cy.get('#mail').type('german@dolnikov.ru'); // ввели верный логин
       cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
       cy.get('#loginButton').click(); // нажали на кнопку
       cy.get('#messageHeader').contains('Авторизация прошла успешно'); // после авторизации видим текст
       cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
       cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик есть и он виден пользователю
       })

    it('Восстановление пароля', function () {
         cy.visit('https://login.qa.studio/'); // зашли на сайт
         cy.get('#forgotEmailButton').click(); //нажали на кнопку Забыли пароль
         cy.get('#mailForgot').type('german@dolnikov.ru'); //ввели почту для восстановления пароля
         cy.get('#restoreEmailButton').click(); //нажали на кнопку Отправить код
         cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); //после отправки формы видим текст
         cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик есть и он виден пользователю
       })

   it('Верный логин и неверный пароль', function () {
         cy.visit('https://login.qa.studio'); //зашли на сайт
         cy.get('#mail').type('german@dolnikov.ru'); //ввели верный логин
         cy.get('#pass').type('iLoveqastudio2'); //ввели неверный пароль
         cy.get('#loginButton').click(); //нажали на кнопку
         cy.get('#messageHeader').contains('Такого логина или пароля нет'); //текст содержит
         cy.get('#messageHeader').should('be.visible'); //текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //есть крестик и он виден пользователю
     })

   it('Неверный логин и верный пароль', function () {
      cy.visit('https://login.qa.studio'); //зашли на сайт
      cy.get('#mail').type('german@dolnikovvv.ru'); //ввели неверный логин
      cy.get('#pass').type('iLoveqastudio1'); //ввели неверный пароль
      cy.get('#loginButton').click(); //нажали на кнопку
      cy.get('#messageHeader').contains('Такого логина или пароля нет'); //текст содержит
      cy.get('#messageHeader').should('be.visible'); //текст виден пользователю
      cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //есть крестик и он виден пользователю
     })

   it('Валидация на наличие @', function () {
      cy.visit('https://login.qa.studio'); //зашли на сайт
      cy.get('#mail').type('germandolnikov.ru'); //ввели логин без @
      cy.get('#pass').type('iLoveqastudio1'); //ввели верный пароль
      cy.get('#loginButton').click(); //нажали на кнопку
      cy.get('#messageHeader').should('be.visible'); //текст виден пользователю
      cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); //текст содержит
      cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //есть крестик и он виден пользователю
     })

   it('Приведение к строчным буквам в логине', function () {
       cy.visit('https://login.qa.studio/'); // зашли на сайт
       cy.get('#mail').type('GerMan@dolnikov.ru'); // ввели верный логин, содержащий прописные буквы
       cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
       cy.get('#loginButton').click(); // нажали на кнопку
       cy.get('#messageHeader').contains('Авторизация прошла успешно'); // после авторизации видим текст
       cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
       cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик есть и он виден пользователю
       })
   })

   describe('Покупка аватара', function () {                                // название набора тестов
      it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
           cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
           cy.get('input[type="email"]').type('EMAIL');                   // вводим логин
           cy.get('input[type="password"]').type('PASS');               // вводим пароль
           cy.get('button[type="submit"]').click();                        // нажимаем кнопку Подтвердить
           cy.wait(2000);
           cy.get('.header__container > .header__id').click({ force: true }); // Клик в шапке на аву тренера
           cy.get('[href="/shop"]').click();                               // нажимаем кнопку Магазин
           cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара
           cy.get('.credit').type('4620869113632996');                     // вводим номер карты
           cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
           cy.get('.k_input_date').type('1225');                           // вводим срок действия карты
           cy.get('.k_input_name').type('NAME');                           // вводим имя владельца действия карты
           cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
           cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
           cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
           cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
       });
   });