﻿/*global document, window, $, ko, debug, setTimeout, alert */


/*
 * Knockout UI Auto-complete Drop Down
 * 
 * Copyright (c) 2011 Ian Mckay
 *
 * https://github.com/madcapnmckay/Knockout-UI
 *
 * License: MIT http://www.opensource.org/licenses/mit-license.php
 *
 */
 (function () {
     // private functions/variables
     // var templateEngine = new ko.jqueryTmplTemplateEngine();
     var templateEngine = new ko.KoExternalTemplateEngine();

     ko.dropdown =
    {
        viewModel: function (configuration) {
            this.element = configuration.element;
            this.boundValue = configuration.boundValue;

            this.selectItems = configuration.selectItems;
            this.optionsBinding = configuration.optionsBinding;
            this.optionsText = configuration.optionsText;
            this.optionsValue = configuration.optionsValue;
            this.optionsCaption = configuration.optionsCaption;

            /* autocomplete configuration */
            this.minLength = 0;
            this.position =
            {
                my: "right top",
                at: "right bottom",
                offset: '0 -1'
            };

            this.data = function () {
                if (this.optionsBinding) {
                    var values = [], i,
                    j;
                    for (i = 0, j = this.selectItems().length; i < j; i++) {
                        var optionValue = typeof this.optionsValue === "string" ? this.selectItems()[i][this.optionsValue] : this.selectItems()[i];

                        // Pick some text to appear in the drop-down list for this data value
                        var optionsTextValue = this.optionsText;
                        if (typeof optionsTextValue === "function") {
                            optionText = optionsTextValue(value[i]);
                            // Given a function; run it against the data value
                        }
                        else if (typeof optionsTextValue === "string") {
                            optionText = this.selectItems()[i][optionsTextValue];
                            // Given a string; treat it as a property name on the data value
                        }
                        else {
                            optionText = optionValue;
                            // Given no optionsText arg; use the data value itself
                        }
                        optionValue = ko.utils.unwrapObservable(optionValue);
                        optionText = ko.utils.unwrapObservable(optionText);
                        values.push(
                        {
                            text: optionText,
                            value: optionValue
                        });
                    }
                    return values;
                }
                else {
                    return this.selectItems();
                }
            };

            this.selectedText = ko.dependentObservable(function () {
                var value = this.data();
                var selectedItem = ko.utils.arrayFirst(this.data(), function (item) {
                    return item.value === this.boundValue();
                }, this);
                var txt = selectedItem === null ? "" : selectedItem.text;
                return txt;
            }, this);

            this.source = function (request, response) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                response(ko.utils.arrayMap(ko.utils.arrayFilter(this.data(), function (item) {
                    return item.text && (!request.term || matcher.test(item.text));
                }), function (item) {
                    return {
                        label: item.text.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(request.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>"),
                        value: item.value
                    };
                }));
            } .bind(this);

            this.select = function (event, ui) {
                if (this.element !== undefined) {
                    this.element.val(ui.item.value);
                }
                this.boundValue(ui.item.value);
                event.preventDefault();
            } .bind(this);

            this.change = function (event, ui) {
                if (!ui.item) {
                    var $input = $(event.target), value = $input.val(), matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(value) + "$", "i"), valid = false, viewModel = this;

                    $.each(this.data(), function () {
                        valid = (value === "" && viewModel.optionsCaption !== undefined) || this.text.match(matcher);
                        if (valid) {
                            valid = true;
                            viewModel.boundValue(value === "" ? undefined : this.value);
                            return false;
                        }
                    });
                    if (!valid) {
                        $input.val(this.boundValue());
                    }
                }
            } .bind(this);

            this.renderItem = function (ul, item) {
                return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul);
            } .bind(this);

            this.open = function (event, ui) {
                $(event.target).parent().addClass("open");
            };

            this.close = function (event, ui) {
                $(event.target).parent().removeClass("open");
            };

            this.showAll = function () {
                // pass empty string as value to search for, displaying all results
                this.search("");
            } .bind(this);
        }
    };
    
     ko.addTemplateSafe("autoCompleteTemplate", "<span class=\"inputs\"><input type=\"text\" autocomplete=\"off\" tabindex=\"1\" spellcheck=\"false\" style=\"outline-style: none; outline-width: initial; outline-color: initial;\" data-bind=\"value: selectedText(), autocomplete : $data\" /></span>", templateEngine);
     //ko.addTemplateSafe("autoCompleteTemplate", "<div class=\"dropdown\"><input type=\"text\" data-bind=\"value: selectedText(), autocomplete : $data\" /><a href=\"javascript:void(0)\" class=\"button\" tabindex=\"-1\" data-bind=\"click : showAll\"></a></div>", templateEngine);
     ko.addTemplateSafe("dropdownTemplate", "<span class=\"inputs\"><button type=\"button\" class=\"button button-default\" data-bind=\"click: showAll, autocomplete : $data\"><span class=\"button-content\" data-bind=\"text: selectedText()\"></span><img class=\"button-arrow\" src=\"/Styles/CAI/Images/arrow.gif\"></button></span>", templateEngine);

     ko.bindingHandlers.dropdown =
    {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value,
            options,
            autoComplete,
            allBindings,
            $container,
            $select,
            dropdown,
            valuesLoader,
            selectItems,
            _boundValue,
            _selectItems;

            allBindings = allBindingsAccessor();
            options = allBindings['options'];
            autoComplete = allBindings['autoComplete'] || false;
            value = ko.utils.unwrapObservable(valueAccessor());

            // create container
            $container = $('<div></div>').insertAfter(element);
            $select = $(element).hide();

            if (options) {
                // mode 1 options binding plus value binding
                if (allBindings['value'] === undefined) {
                    throw new Error("A value binding must be used if an options binding is attached");
                }
                _boundValue = allBindings['value'];
            }
            else {
                // mode 2 data from select itself plus value from valueAccessor
                var alreadySelected = $select.children(':selected').get(0).value;
                if (ko.isWriteableObservable(valueAccessor())) {

                    _boundValue = valueAccessor();
                    if (value !== alreadySelected) {
                        var matchingOptions = $select.children('option').filter(function () {
                            return $(this).text() === value || $(this).val() === value;
                        });
                        if (matchingOptions.length > 0) {

                            // value is valid change select
                            $select.val(value);
                        }
                        else {
                            // set the observable to the currently selected option
                            _boundValue(alreadySelected);
                        }
                    }

                }
                else {
                    _boundValue = new ko.observable(alreadySelected);
                }
            }

            _selectItems = options === undefined ? new ko.observableArray($select.children("option").map(function () {
                return {
                    text: this.text,
                    value: this.value
                };
            })) : options;

            dropdown = new ko.dropdown.viewModel(
            {
                element: $select,
                boundValue: _boundValue,
                selectItems: _selectItems,
                optionsBinding: options !== undefined,
                optionsValue: allBindings['optionsValue'],
                optionsText: allBindings['optionsText'],
                optionsCaption: allBindings['optionsCaption']
            });

            var templateId = autoComplete ? 'autoCompleteTemplate' : 'dropdownTemplate';
            ko.renderTemplate(templateId, dropdown,
            {
                templateEngine: templateEngine
            }, $container.get(0), "replaceNode");
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            // this is allow us to set the bound value when the control is not used with options/value combo
            // strange that value on its own doesn't work...
            if (!allBindingsAccessor()['options']) {
                var $select = $(element), newValue = ko.utils.unwrapObservable(valueAccessor()), elementValue = $select.val(), valueHasChanged = (newValue !== elementValue);

                if (valueHasChanged) {
                    $select.val(newValue);
                }
            }
        }
    };
 } ());