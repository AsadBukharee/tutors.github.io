jQuery(document).ready(function() {
    function handleOldUiPages() {
        // add template name class below to use the modal for an old non-bootstrap template
        if (jQuery("body").hasClass("page-template-enrol-fulfilment")) {
            jQuery(".jquery-modal").css("zIndex", 9999);
            jQuery(".cc-page-content p, .cc-page-content h3").attr(
                "style",
                "margin-bottom: 20px !important"
            );
            jQuery(".cc-page-content ul ul").attr("style", "list-style-type: circle");
            jQuery(".cc-page-content ul ul ul").attr(
                "style",
                "list-style-type: square"
            );

            jQuery(".cc-page-content a").attr("style", "color: #004bb9");
            jQuery(".modal-container").attr("style", "margin-top: 0 !important");
        }
    }

    jQuery(".rp-modal-trigger").click(function(event) {
        event.preventDefault();

        if (jQuery(this).attr("disabled")) {
            // Implement a disable mechanism to prevent repeated clicks
            return;
        }

        jQuery(this).attr("disabled", "disabled");
        var self = this;
        // jQuery(".rp-modal").empty();
        jQuery.get(this.href, function(html) {
            var htmlWrapper = document.createElement("div");
            jQuery(html).appendTo(htmlWrapper);
            var modalContent = jQuery(htmlWrapper).find("#content");
            modalContent.addClass("modal-container");
            var section = modalContent.find(".cc-page-content.section");
            section.removeClass("section").addClass("section-half");

            // delete the navigation anchor
            var anchorToBeDeleted = modalContent.find(".cc-hero-default a");

            if (anchorToBeDeleted) {
                anchorToBeDeleted.remove();
            }

            jQuery(".rp-modal").html(modalContent);

            jQuery(".rp-modal").modal({
                fadeDuration: 100,
                clickClose: false,
            });

            handleOldUiPages();
            // Make all internal anchors open in a new page
            jQuery(".rp-modal a")
                .attr("target", "_blank")
                .attr("rel", "noreferrer noopener")
                .attr("style", "word-break: break-word;");

            jQuery(self).removeAttr("disabled");
        });
    });

});