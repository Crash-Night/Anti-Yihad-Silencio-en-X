// ==UserScript==
// @name         Anti-Yihad-Silencio-en-X [2.0]
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  [Si la version anterior no funciona correctamente este SCRIPT] - Si estás cansado de que te aparezca contenido de yihadistas islámicos, este script hace que no aparezca más en la plataforma X.
// @author       Crash-Night
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Lista de palabras clave relacionadas con Palestina e Israel
    const keywords = [
        'Palestina', 'Israel', 'Gaza', 'Hamas', 'Cisjordania', 'IDF', 'judíos', 'árabes', 'conflicto', 'guerra',
        'West Bank', 'Tel Aviv', 'Jerusalén', 'Hebrón', 'Ocupación', 'Sionismo', 'Intifada', 'Zionist',
        'India', 'Iran', 'Arabia Saudita', 'Egipto', 'Jordania', 'Siria',
        'Líbano', 'Irak', 'Yemen', 'Sudán', 'Libia', 'Omán', 'Kuwait',
        'Qatar', 'Emiratos Árabes Unidos', 'Bahréin', 'Palestina',
        'jihad', 'terrorismo', 'sharia', 'extremismo', 'yihadista', 'califato', 'mujaidín', 'yihad', 'Islam radical', 'terrorista', 'lucha santa', 'violencia islámica', 'fundamentalismo', 'Abbas Nilforooshan', 'Hezbolan', 'Hezbollah', 'site_khamenei', 'Attacks on Civilians',
        '#Iran', '#India', 'Iran', 'Arabia Saudita', 'Egipto',
        'Jordania', 'Siria', 'Líbano', 'Irak', 'Yemen', 'Sudán', 'Libia', 'Omán', 'Kuwait', 'Qatar', 'Emiratos Árabes Unidos', 'Bahréin', 'Palestina', '🇵🇸 The Holocaust', '🇵🇸', 'IsraHell is exterminating', 'BREAKING: HEZBOLLAH', 'HEZBOLLAH', 'ISLAM', 'islam', 'ALUAKBA',
				'yihadismo',
				'salafismo',
				'terror',
				'fundamentalista',
				'intolerancia',
				'radicalización',
				'islamofobia',
				'mártir',
				'yihad global',
				'califato mundial',
				'shahid',
				'taqiyya',
				'takfir',
				'hiyab',
				'dawa',
				'mujahid',
				'jihad violento',
				'militante islamista',
				'guerra santa',
				'extremista',
      '🇺🇸🇾🇪',
      '🇾🇪',
      'genocide',
      'Genocide',
      '',
    ];

    // Lista de nombres árabes comunes
    const arabicNames = [
        'Mohammed', 'Ahmed', 'Ali', 'Omar', 'Hassan', 'Hussein', 'Abdullah', 'Ibrahim', 'Yusuf', 'Khaled', 'Fatima', 'Aisha', 'Zainab'
    ];

    // Lista de banderas (emojis) relacionadas
    const flags = ['🇵🇸', '🇮🇱'];

    // Función para detectar si un texto está en árabe (usando caracteres Unicode)
    function isArabic(text) {
        return /[\u0600-\u06FF]/.test(text);
    }

    // Función para detectar imágenes relacionadas con Palestina o Israel
    function containsRelevantImage(tweet) {
        const images = tweet.querySelectorAll('img');
        for (let img of images) {
            const altText = img.alt.toLowerCase();
            // Buscar palabras clave en los atributos alt de las imágenes
            for (let keyword of keywords) {
                if (altText.includes(keyword.toLowerCase())) {
                    return true;  // Si una imagen contiene palabras clave, la consideramos relevante
                }
            }
        }
        return false;
    }

    // Función para ocultar un tweet si cumple con los criterios
    function hideTweetIfRelevant(tweet) {
        const tweetText = tweet.innerText.toLowerCase();

        // Revisar si el tweet contiene alguna palabra clave
        for (let keyword of keywords) {
            if (tweetText.includes(keyword.toLowerCase())) {
                tweet.style.display = 'none';
                return;
            }
        }

        // Revisar si el tweet contiene nombres árabes
        for (let name of arabicNames) {
            if (tweetText.includes(name.toLowerCase())) {
                tweet.style.display = 'none';
                return;
            }
        }

        // Revisar si el tweet contiene banderas
        for (let flag of flags) {
            if (tweetText.includes(flag)) {
                tweet.style.display = 'none';
                return;
            }
        }

        // Ocultar si el tweet está en árabe
        if (isArabic(tweetText)) {
            tweet.style.display = 'none';
            return;
        }

        // Ocultar si el tweet contiene imágenes relevantes
        if (containsRelevantImage(tweet)) {
            tweet.style.display = 'none';
            return;
        }
    }

    // Función principal para buscar y ocultar tweets
    function checkTweets() {
        // Selecciona todos los tweets en el feed
        const tweets = document.querySelectorAll('article[role="article"]');

        tweets.forEach(tweet => {
            hideTweetIfRelevant(tweet);
        });
    }

    // Ejecutar la función repetidamente (cada 3 segundos) para monitorear nuevos tweets
    setInterval(checkTweets, 3000);

})();
