describe('Custom Tracking', function () {
    'use strict';

    before(function () {
        var html = '<div>' +
            '<input id="mc-embedded-subscribe" class="js-code-snippet" />' +
            '<div class="js-code-snippet"><button></button>' +
            '<nav><button></button></nav></div>' +
            '<select class="js-language-select">' +
            '<option value="raw">raw</option><option value="javascript">javascript</option>' +
            '</select>' +
            '</div>';

        helpers.dom.addHTML(html);
    });

    it('should be able to track subscribe to emails submit button', function () {
        var subscribeEmailTrack = sinon.spy(Gamelocker.customTracking, 'subscribeEmailTrack'),
            subscribeButton = $('#mc-embedded-subscribe');

        Gamelocker.customTracking.init();

        subscribeButton.click();

        assert.equal(subscribeEmailTrack.called, true);
    });

    it('should be able to track when code copy happens', function () {
        var trackCodeCopy = sinon.spy(Gamelocker.customTracking, 'trackCodeCopy'),
            copyButton = $('.js-code-snippet > button');

        Gamelocker.customTracking.init();

        copyButton.click();

        assert.equal(trackCodeCopy.called, true);
    });

    it('should be able to track language change in code snippets', function () {
        var trackSnippetLanguageChange = sinon.spy(Gamelocker.customTracking, 'trackSnippetLanguageChange'),
            languageButton = $('.js-code-snippet nav button');

        Gamelocker.customTracking.init();

        languageButton.click();

        assert.equal(trackSnippetLanguageChange.called, true);
    });

    it('should be able to track global language changes', function () {
        var trackGlobalLanguageChange = sinon.spy(Gamelocker.customTracking, 'trackGlobalLanguageChange'),
            select = $('.js-language-select');

        Gamelocker.customTracking.init();

        select.change();

        assert.equal(trackGlobalLanguageChange.called, true);
    });
});
