/*global document, window, $, ko, debug, setTimeout, alert */
ko.bindingHandlers.autocomplete =
{
    init: function (element, valueAccessor, allBindings, viewModel) {
        var $element = $(element), value = valueAccessor(), $config = typeof (value) === 'function' ? value() : value;

        $element.autocomplete($config);

        $config.search = function (term) {
            if ($element.autocomplete("widget").is(":visible")) {
                $element.autocomplete("close");
                return;
            }

            $element.addClass("searching");
            $element.autocomplete("search", term);
            $element.focus();
        };

        // allow override of render item
        if ($config.renderItem !== undefined) {
            $element.data("autocomplete")._renderItem = $config.renderItem;
        }

        $element.data("autocomplete")._resizeMenu = function () {
            var ul = this.menu.element;
            ul.outerWidth(Math.max(
            // Firefox wraps long text (possibly a rounding bug)
            // so we add 1px to avoid the wrapping (#7513)
            ul.width("").outerWidth() + 1,
            this.element.outerWidth()
        ));
            $element.autocomplete("option", "position", { my : 'left top', at: 'left bottom' });
        };
    }
};