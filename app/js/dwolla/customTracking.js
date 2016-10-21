(function (Gamelocker) {
    'use strict';

    function addEventListeners() {
        $('#mc-embedded-subscribe').on('click', Gamelocker.customTracking.subscribeEmailTrack);
        $('.js-code-snippet > button').on('click', Gamelocker.customTracking.trackCodeCopy);
        $('.js-code-snippet nav button').on('click', Gamelocker.customTracking.trackSnippetLanguageChange);
        $('.js-language-select').on('change', Gamelocker.customTracking.trackGlobalLanguageChange);
    }

    Gamelocker.namespace('customTracking', {

        init: function () {
            addEventListeners();
        },

        subscribeEmailTrack: function () {
            Gamelocker.util.googleAnalytics.trackEvent('subscribe to emails', 'click');
        },

        trackCodeCopy: function () {
            Gamelocker.util.googleAnalytics.trackEvent('code sample', 'copy', window.location.href);
        },

        trackSnippetLanguageChange: function () {
            Gamelocker.util.googleAnalytics.trackEvent('code sample', 'language change', $(this).attr('id'));
        },

        trackGlobalLanguageChange: function () {
            Gamelocker.util.googleAnalytics.trackEvent('global language select', 'language change', $(this).val());
        }
    });

    $(Gamelocker.customTracking.init);
}(Gamelocker));
