jQuery(document).ready(function() {
    var breakpoint = "xs";
    if (window.innerWidth >= 768) {
        breakpoint = "md";
    }

    var prevScrolledState = "unscrolled";

    function scrollHandler() {
        // pageYOffset has better cross browser support compared to scrollY
        var windowScrollY = window.pageYOffset;

        if (breakpoint === "xs") {
            if (windowScrollY > 100) {
                jQuery("html").addClass("scrolled");
            } else {
                jQuery("html").removeClass("scrolled");
            }
        } else if (breakpoint === "md") {
            var currentScrolledState = "unscrolled";

            if (windowScrollY === 0) {
                // Desktop and at the very top, will open the menu
                jQuery("html")
                    .removeClass("scrolled")
                    .addClass("menu-open");
                currentScrolledState = "unscrolled";
            } else if (windowScrollY > 0 && windowScrollY <= 100) {
                jQuery("html").removeClass("scrolled");
                currentScrolledState = "unscrolled";
            } else if (windowScrollY > 100) {
                jQuery("html").addClass("scrolled");
                currentScrolledState = "scrolled";
            }

            // If menu has gone from unscrolled to scolled, it must close the menu
            if (
                prevScrolledState === "unscrolled" &&
                currentScrolledState === "scrolled"
            ) {
                jQuery("html").removeClass("menu-open");
            }

            prevScrolledState = currentScrolledState;
        }
    }
    // Run once on pageload
    scrollHandler();
    // Attach to scroll listener
    jQuery(window).scroll(scrollHandler);
    // Hamburger menu click listener
    jQuery(".cluey-menu_hamburger-wrapper").click(function() {
        jQuery("html").toggleClass("menu-open");
    });

    if (breakpoint === "xs") {
        // Menu items that have children, collapse in mobile only
        jQuery(".cluey-menu_nav-menu .menu-item-has-children").click(function() {
            jQuery(this).toggleClass("open");
        });
    }
});