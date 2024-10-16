// ==UserScript==
// @name         Anti-Yihad-Silencio-en-X
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Si estás cansado de que te aparezca contenido de yihadistas islámicos, este script hace que no aparezca más en la plataforma X.
// @author       Crash-Night
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Función para detectar si el texto está en árabe
    function isArabic(text) {
        const arabicRegex = /[\u0600-\u06FF]/;
        const isArabicDetected = arabicRegex.test(text);
        console.log(`Detectando árabe: "${text}" - Resultado: ${isArabicDetected}`);
        return isArabicDetected;
    }

    // Lista de países a ocultar por bandera
    const countriesToHide = [
        'India', 'Iran', 'Arabia Saudita', 'Egipto', 'Jordania', 'Siria',
        'Líbano', 'Irak', 'Yemen', 'Sudán', 'Libia', 'Omán', 'Kuwait',
        'Qatar', 'Emiratos Árabes Unidos', 'Bahréin', 'Palestina'
    ];

    // Función para ocultar tweets y perfiles en árabe
    function hideArabicContent() {
        // Ocultar tweets
        const tweets = document.querySelectorAll('article');
        tweets.forEach(tweet => {
            const tweetText = tweet.innerText || tweet.textContent;
            if (isArabic(tweetText)) {
                tweet.style.display = 'none'; // Oculta el tweet
                console.log(`Ocultando tweet: "${tweetText}"`);
            }
        });

        // Ocultar nombres de perfil
        const profiles = document.querySelectorAll('div[role="article"]');
        profiles.forEach(profile => {
            const username = profile.querySelector('span[dir="ltr"]');
            if (username && isArabic(username.innerText)) {
                profile.style.display = 'none'; // Oculta el perfil
                console.log(`Ocultando perfil: "${username.innerText}"`);
            }

            // Comprobar si el nombre del perfil está en la lista de países
            if (countriesToHide.some(country => username && username.innerText.includes(country))) {
                profile.style.display = 'none'; // Oculta el perfil
                console.log(`Ocultando perfil de país: "${username.innerText}"`);
            }
        });

        // Ocultar iconos de bandera árabe y países específicos
        const flags = document.querySelectorAll('img');
        flags.forEach(flag => {
            const altText = flag.alt || '';
            if (isArabic(altText) || countriesToHide.some(country => altText.includes(country))) {
                flag.parentElement.style.display = 'none'; // Oculta el elemento de la bandera
                console.log(`Ocultando bandera: "${altText}"`);
            }
        });
    }


    // Ocultar tweets
    const tweets = document.querySelectorAll('article');
    tweets.forEach(tweet => {
        const tweetText = tweet.innerText || tweet.textContent;
        if (isArabic(tweetText) || containsJihadistContent(tweetText)) {
            tweet.style.display = 'none'; // Oculta el tweet
            console.log(`Ocultando tweet: "${tweetText}"`);
        }
    });



    // Ejecutar la función al cargar la página
    window.addEventListener('load', () => {
        console.log('Página cargada, ocultando contenido árabe y banderas...');
        hideArabicContent();
    });

    // Lista de términos relacionados con el extremismo islamista
    const jihadistTerms = [
        "jihad",
        "terrorismo",
        "sharia",
        "extremismo",
        "yihadista",
        "califato",
        "mujaidín",
        "yihad",
        "Islam radical",
        "terrorista",
        "lucha santa",
        "violencia islámica",
        "fundamentalismo",
        "Abbas Nilforooshan",
        "Hezbolan",
        "Hezbollah",
        "site_khamenei",
        "Attacks on Civilians",
        "#Iran",
        "#India", 
        "Iran", 
        "Arabia Saudita", 
        "Egipto", 
        "Jordania", 
        "Siria",
        "Líbano", 
        "Irak", 
        "Yemen", 
        "Sudán", 
        "Libia", 
        "Omán", 
        "Kuwait",
        "Qatar", 
        "Emiratos Árabes Unidos", 
        "Bahréin", "Palestina",
        "🇵🇸 The Holocaust",
        "🇵🇸",
        "IsraHell is exterminating",
        "BREAKING: HEZBOLLAH",
        "HEZBOLLAH",
        "ISLAM",
        "islam",
        "ALUAKBA",
    ];

    // Función para detectar contenido relacionado con el extremismo islamista
    function containsJihadistContent(text) {
        return jihadistTerms.some(term => text.toLowerCase().includes(term));
    }

    // Usa un MutationObserver para detectar nuevos tweets o cambios en el DOM
    const observer = new MutationObserver(hideArabicContent);
    observer.observe(document.body, { childList: true, subtree: true });
})();
